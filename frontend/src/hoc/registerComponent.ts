import { FC } from "react";

interface ComponentProps {
    [key: string]: any;
}

interface RegisteredComponent<T> {
    component: FC<T>;
    props: T;
}

const componentRegistry: Record<string, RegisteredComponent<any>> = {};

export const createComponent = <T extends ComponentProps>(data: { pageName: string; component: FC<T>; props: T }) => {
    if (componentRegistry[data.pageName]) {
        throw new Error(`Page '${data.pageName}' is already registered`);
    }
    componentRegistry[data.pageName] = { component: data.component, props: data.props };
    return data.component;
};

export const getRegisteredComponent = (pageName: string | null) => {
    if (!pageName) return null;
    return componentRegistry[pageName];
};
