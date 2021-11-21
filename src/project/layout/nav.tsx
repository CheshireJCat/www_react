import { NavLink } from "react-router-dom"
import styled from "styled-components"

const navs = [{
    to: "/",
    name: "Home"
}, {
    to: "/blog/list",
    name: "Blog"
}, {
    to: "/about",
    name: "About"
}]

const NavStyle = styled.nav`
    .active{
        color: pink
    }
`
const Nav: React.FC = () => {
    return <NavStyle>
        {navs.map(({ to, name }) => {
            return <NavLink key={name} to={to}>{name}</NavLink>
        })}
    </NavStyle>
}
export default Nav