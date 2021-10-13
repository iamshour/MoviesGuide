import { StyledEngineProvider } from "@mui/styled-engine"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./styles/main.scss"

ReactDOM.render(
	<StyledEngineProvider injectFirst>
		<App />
	</StyledEngineProvider>,
	document.getElementById("root")
)
