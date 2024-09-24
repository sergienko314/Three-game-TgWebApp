import { Routes, Route } from "react-router-dom";
import Page from "../../page/MapPage/Page";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Page />} />
            <Route path="*" element={<Page />} />
        </Routes>
    );
};
