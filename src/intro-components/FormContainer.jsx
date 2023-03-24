import '../intro.css'


export function FormContainer({title, subHeading, children}) {
	return(
		<div className="intro">
			<h1>{title}</h1>
			<p className="subhead">{subHeading}</p>
			{children}
		</div>
	)
}