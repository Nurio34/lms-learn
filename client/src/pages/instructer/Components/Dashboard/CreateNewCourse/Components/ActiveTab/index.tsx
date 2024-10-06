type ActiveTabType = {
    component: JSX.Element;
};

function ActiveTab({ component }: ActiveTabType) {
    return <div>{component}</div>;
}

export default ActiveTab;
