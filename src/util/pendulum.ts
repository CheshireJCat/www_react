class Pendulum {
    g: number;
    l1: number;
    l2: number;
    m1: number;
    m2: number;
    a1: number;
    a2: number;
    a1_v: number;
    a2_v: number;
    /**
     * 
     * @param {number} l1 大钟摆 摆杆长度
     * @param {number} l2 小钟摆 摆杆长度
     * @param {number} m1 质量
     * @param {number} m2 
     * @param {number} g  重力加速度
     */
    constructor(l1: number, l2: number, m1: number, m2: number, g: number) {
        this.g = g;

        this.l1 = l1;
        this.l2 = l2;

        this.m1 = m1;
        this.m2 = m2;

        this.a1 = Math.PI;
        this.a2 = Math.PI / 8;

        this.a1_v = 0;
        this.a2_v = 0;
    }

    tick() {
        this.a1_v += this.calcA1();
        this.a2_v += this.calcA2();

        this.a1 += this.a1_v;
        this.a2 += this.a2_v;
    }

    calcA1() {
        // g x (m1 + m2) x sin(a1)
        let num1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1);
        // m2 x g x sin(a1 - a2)
        let num2 = -this.m2 * this.g * Math.sin(this.a1 - 2 * this.a2);
        // 2sin(a1 - a2) x m2
        let num3 = -2 * Math.sin(this.a1 - this.a2) * this.m2;
        // v2^2 x l2 + v1^2 x l1 x cos(a1 - a2)
        let num4 =
            this.a2_v * this.a2_v * this.l2 +
            this.a1_v * this.a1_v * this.l1 * Math.cos(this.a1 - this.a2);
        // l1(2m1 + m2 - m2cos(2a1- 1a2))
        let den =
            this.l1 *
            (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
        return (num1 + num2 + num3 * num4) / den;
    }

    calcA2() {
        // 2sin(a1 - a2)
        let num1 = 2 * Math.sin(this.a1 - this.a2);
        // v1^2 x l1(m1+m2)
        let num2 = this.a1_v * this.a1_v * this.l1 * (this.m1 + this.m2);
        // g(m1 + m2)cos(a1)
        let num3 = this.g * (this.m1 + this.m2) * Math.cos(this.a1);
        // v2^2 x l2m2cos(a1-a2)
        let num4 =
            this.a2_v * this.a2_v * this.l2 * this.m2 * Math.cos(this.a1 - this.a2);
        let den =
            this.l2 *
            (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
        return (num1 * (num2 + num3 + num4)) / den;
    }
}

export default class Visualization {
    canvas!: HTMLCanvasElement | null;
    ctx: any;
    ctnSize!: { width: number; height: number; };
    trail!: { x: number, y: number }[];
    batchSize!: number;
    frameRate!: number;
    trailLength!: number;
    lastTime!: number;
    hangPos!: { x: number; y: number; };
    pendulum!: Pendulum;
    shadowColorRgb!: string;
    color!: { lineColor: string; dotColor: string; shadowColor: string };
    constructor(container: HTMLCanvasElement, color = {
        lineColor: "#fff",
        dotColor: "#2196F3",
        shadowColor: "#2196F3"
    }) {
        if (!container) {
            console.error("")
            return
        }
        let canvas = document.createElement("canvas");
        container.appendChild(canvas)
        this.canvas = canvas;
        this.color = color;
        if (!this.color.shadowColor) {
            this.color.shadowColor = this.color.dotColor;
        }
        this.shadowColorRgb = this.color.shadowColor.slice(1).match(/(\w{2})/ig)?.map((item: string) => parseInt(item, 16)).join(",") || "255,255,255"
        this.ctx = this.canvas.getContext("2d");
        const { width, height } = container.getBoundingClientRect()
        this.ctnSize = {
            width,
            height
        };
        console.log(width, height)

        this.trail = [];
        this.batchSize = 10;
        this.frameRate = 120;
        this.trailLength = 200;

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

        this.lastTime = 0;
        requestAnimationFrame(this.draw.bind(this));
    }

    resize() {
        if (!this.canvas) return
        let { width, height } = this.ctnSize;
        this.canvas.setAttribute("width", width + "");
        this.canvas.setAttribute("height", height + "");
        // 支点
        this.hangPos = {
            x: width / 2,
            y: height / 3
        };

        this.trail = [];
        // 钟摆杆长
        let space = (height / 3) * 1.5;
        if (space > 500) space = 500;

        this.pendulum = new Pendulum((space / 3) * 2, space / 3, 50, 20, 0.1);
    }

    draw(time: number) {
        if (!this.canvas) return
        requestAnimationFrame(this.draw.bind(this));

        let x1, x2, y1, y2;

        while (this.lastTime < time) {
            this.pendulum.tick();
            this.lastTime += 1000 / this.frameRate;

            x1 = this.hangPos.x + this.pendulum.l1 * Math.sin(this.pendulum.a1);
            x2 = x1 + this.pendulum.l2 * Math.sin(this.pendulum.a2);

            y1 = this.hangPos.y + this.pendulum.l1 * Math.cos(this.pendulum.a1);
            y2 = y1 + this.pendulum.l2 * Math.cos(this.pendulum.a2);

            this.trail.push({
                x: x2,
                y: y2
            });
            if (this.trail.length > this.trailLength) this.trail.shift();
        }

        this.lastTime = time;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawTrail();

        this.drawPendulum(x1, x2, y1, y2);
    }

    drawPendulum(x1: number | undefined, x2: number | undefined, y1: number | undefined, y2: number | undefined) {
        this.ctx.save();
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = this.color.dotColor;
        this.ctx.strokeStyle = this.color.lineColor;

        this.ctx.beginPath();
        this.ctx.moveTo(this.hangPos.x, this.hangPos.y);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();

        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.hangPos.x, this.hangPos.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x1, y1, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawTrail() {
        this.ctx.save();

        this.ctx.shadowColor = this.color.dotColor;

        this.ctx.lineWidth = 5;
        this.ctx.lineJoin = "round";

        this.ctx.beginPath();
        let batchSize = this.batchSize;
        let i = 0;
        while (i < this.trail.length) {
            if (
                i + batchSize > this.trail.length ||
                this.trail.length < this.trailLength
            )
                batchSize = 1;

            const pointBatch = this.trail.slice(i + 1, i + 1 + batchSize);
            const previousPoint = this.trail[i];

            this.ctx.beginPath();
            this.ctx.moveTo(previousPoint.x, previousPoint.y);

            for (let point of pointBatch) {
                this.ctx.lineTo(point.x, point.y);
            }
            this.ctx.strokeStyle = `rgba(${this.shadowColorRgb},${this.map(i + batchSize, 0, this.trail.length, 0, 1)})`
            this.ctx.stroke();

            i += batchSize;
        }

        this.ctx.restore();
    }

    map(number: number, in_min: number, in_max: number, out_min: number, out_max: number) {
        return (
            ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    }
}
