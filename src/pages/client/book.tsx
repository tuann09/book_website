import BookDetail from "components/client/book/book.detail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BookPage = () => {
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            //do somethingAdd commentMore actions
            console.log("book id = ", id);
        }
    }, [id]);
    return (
        <div>
            <BookDetail />
        </div>
    );
};
export default BookPage;
