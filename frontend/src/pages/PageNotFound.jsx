import LinkButton from "../components/LinkButton"

function PageNotFound() {
    return (
        <div>
            <h1>HTTP 404</h1> 
            <p>Page not found.</p>
            <LinkButton to="/" className="">Go back home</LinkButton>
        </div>
    )
}

export default PageNotFound
