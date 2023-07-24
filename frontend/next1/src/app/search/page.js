
import "../../css/Search.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


import Header from "@/components/Header";

export default function Search() {
    return (
        <>
            <Header />
            <div className="container bootstrap snippets bootdeys bootdey">
                <div className="row decor-default">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="contacts-labels">
                            <div className="list">
                                <div className="head">Search results</div>
                                <h2 className="mb-3">Filters</h2> 
                                <div className="unit">
                                    <div className="lab lab-success">Post</div>
                                    <span>7</span>
                                </div>
                                <div className="unit">
                                    <div className="lab lab-primary">People</div>
                                    <span>8</span>
                                </div>
                                <div className="unit">
                                    <div className="lab lab-danger">Photos</div>
                                    <span>13</span>
                                </div>
                                <div className="unit">
                                    <div className="lab lab-warning">Videos</div>
                                    <span>47</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="contacts-list">
                          
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}