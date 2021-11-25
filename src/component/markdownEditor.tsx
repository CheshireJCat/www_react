import { Grid } from "@mui/material"
import CodeMirrorEditor from "./codemirror"
import MarkdownShow from "./markdownShow"

const MarkdownEditor: React.FC<{
    height?: string;
    value: string;
    onChange: (p: { target: { value: string } }) => void;
}> = (props) => {
    return <Grid container style={{ height: props.height }} spacing={1}>
        <Grid item md={6} xs={12}>
            <CodeMirrorEditor {...props} />
        </Grid>
        <Grid item md={6} xs={12}>
            <MarkdownShow value={props.value} />
        </Grid>
    </Grid>
}
export default MarkdownEditor