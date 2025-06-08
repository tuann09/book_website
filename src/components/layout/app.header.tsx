import { useCurrentApp } from "components/context/app.context";

function AppHeader() {
    const { user } = useCurrentApp();
    return (
        <div>
            <h2>App header</h2>
            <div>{JSON.stringify(user)}</div>
        </div>
    );
}

export default AppHeader;
