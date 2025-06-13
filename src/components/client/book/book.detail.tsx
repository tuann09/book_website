import { Row, Col, Rate, Divider } from "antd";
import ImageGallery from "react-image-gallery";
import { useEffect, useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import "styles/book.scss";
import ModalGallery from "./modal.gallery";

interface IProps {
    currentBook: IBookTable | null;
}
const BookDetail = (props: IProps) => {
    const { currentBook } = props;
    const [imageGallery, setImageGallery] = useState<
        {
            original: string;
            thumbnail: string;
            originalClass: string;
            thumbnailClass: string;
        }[]
    >([]);
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const refGallery = useRef<ImageGallery>(null);

    useEffect(() => {
        if (currentBook) {
            const images = [];
            if (currentBook.thumbnail) {
                images.push({
                    original: `${
                        import.meta.env.VITE_BACKEND_URL
                    }/images/book/${currentBook.thumbnail}`,
                    thumbnail: `${
                        import.meta.env.VITE_BACKEND_URL
                    }/images/book/${currentBook.thumbnail}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image",
                });
            }
            if (currentBook.slider) {
                currentBook.slider?.map((item) => {
                    images.push({
                        original: `${
                            import.meta.env.VITE_BACKEND_URL
                        }/images/book/${item}`,
                        thumbnail: `${
                            import.meta.env.VITE_BACKEND_URL
                        }/images/book/${item}`,
                        originalClass: "original-image",
                        thumbnailClass: "thumbnail-image",
                    });
                });
            }
            setImageGallery(images);
        }
    }, [currentBook]);

    const handleOnClickImage = () => {
        //get current index onClick
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    };

    return (
        <div style={{ background: "#efefef", padding: "20px 0" }}>
            <div
                className="view-detail-book"
                style={{
                    maxWidth: 1440,
                    margin: "0 auto",
                    minHeight: "calc(100vh - 150px)",
                }}
            >
                <div
                    style={{
                        padding: "20px",
                        background: "#fff",
                        borderRadius: 5,
                    }}
                >
                    <Row gutter={[20, 20]}>
                        <Col md={10} sm={0} xs={0}>
                            <ImageGallery
                                ref={refGallery}
                                items={imageGallery}
                                showPlayButton={false} //hide play button
                                showFullscreenButton={false} //hide fullscreen button
                                renderLeftNav={() => <></>} //left arrow === <> </>
                                renderRightNav={() => <></>} //right arrow === <> </>
                                slideOnThumbnailOver={true} //onHover => auto scroll images
                                onClick={() => handleOnClickImage()}
                            />
                        </Col>
                        <Col md={14} sm={24}>
                            <Col md={0} sm={24} xs={24}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={imageGallery}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>} //right arrow === <> </>
                                    showThumbnails={false}
                                />
                            </Col>
                            <Col span={24}>
                                <div className="author">
                                    Tác giả:{" "}
                                    <a href="#">{currentBook?.author}</a>{" "}
                                </div>
                                <div className="title">
                                    {currentBook?.mainText ||
                                        "Tên sách chưa cập nhật"}
                                </div>
                                <div className="rating">
                                    <Rate
                                        value={5}
                                        disabled
                                        style={{
                                            color: "#ffce3d",
                                            fontSize: 12,
                                        }}
                                    />
                                    <span className="sold">
                                        <Divider type="vertical" />
                                        Đã bán {currentBook?.sold || 0}{" "}
                                    </span>
                                </div>
                                <div className="price">
                                    <span className="currency">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(currentBook?.price || 0)}
                                    </span>
                                </div>
                                <div className="delivery">
                                    <div>
                                        <span className="left">Vận chuyển</span>
                                        <span className="right">
                                            Miễn phí vận chuyển
                                        </span>
                                    </div>
                                </div>
                                <div className="quantity">
                                    <span className="left">Số lượng</span>
                                    <span className="right">
                                        <button>
                                            <MinusOutlined />
                                        </button>
                                        <input defaultValue={1} />
                                        <button>
                                            <PlusOutlined />
                                        </button>
                                    </span>
                                </div>
                                <div className="buy">
                                    <button className="cart">
                                        <BsCartPlus className="icon-cart" />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button className="now">Mua ngay</button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={imageGallery}
                title={currentBook?.mainText || "Tên sách chưa cập nhật"}
            />
        </div>
    );
};

export default BookDetail;
