import {useState} from "react"
import { FaSearch } from "react-icons/fa";
import "../pages/ChatsPage.css"

export default function SideDrawer(){

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    return(
        <div>
            <div className="searchbar">
            <input className="searchinput" type="text" placeholder="search for users" />
            <FaSearch />
            </div>
        </div>
    )
}