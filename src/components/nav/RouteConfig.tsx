import { Routes, Route } from "react-router";

import Layout from "components/Layout";
import Home from "components/home/Home";
import PageNotFound from "components/PageNotFound";
import CharacterBrowser from "components/characters/browser/_CharacterBrowser";
import CharacterPage from "components/characters/page/_CharacterPage";
import SupportBrowser from "components/supports/browser/_SupportBrowser";
import SupportPage from "components/supports/page/_SupportPage";
import BannerArchive from "components/banners/_BannerArchive";

function RouteConfig() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/characters" element={<CharacterBrowser />} />
                <Route path="/characters/:id" element={<CharacterPage />} />
                <Route path="/supports" element={<SupportBrowser />} />
                <Route path="/supports/:id" element={<SupportPage />} />
                <Route path="/banners/" element={<BannerArchive />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default RouteConfig;
