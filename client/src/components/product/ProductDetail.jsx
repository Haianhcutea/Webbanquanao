import React, { useState } from "react";
import Slider from "react-slick";
import Breadcumb from "../layouts/breadcumb";

//
import big1 from "@/assets/img/products/big1-1.webp";
import big2 from "@/assets/img/products/big1-2.webp";
import big3 from "@/assets/img/products/big1-3.webp";
import big4 from "@/assets/img/products/big1-4.webp";
import big5 from "@/assets/img/products/big1-5.webp";

const ProductDetail = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    speed: 1000,
    infinite: false,
    prevArrow: (
      <button className="slick-prev">
        <i className="ion-chevron-left" />
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <i className="ion-chevron-right" />
      </button>
    ),
    responsive: [
      { breakpoint: 1501, settings: { slidesToShow: 4 } },
      { breakpoint: 1199, settings: { slidesToShow: 4, arrows: false } },
      { breakpoint: 991, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 767, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 575, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 479, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const bigImageSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    fade: true,
    speed: 500,
    asNavFor: nav2, // Liên kết với slider nhỏ
  };

  // Cấu hình cho slider nhỏ
  const smallImageSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 500,
    focusOnSelect: true,
    centerMode: false,
    asNavFor: nav1, // Liên kết với slider lớn
    prevArrow: <button className="slick-prev fa fa-angle-left"></button>,
    nextArrow: <button className="slick-next fa fa-angle-right"></button>,
    responsive: [
      { breakpoint: 1501, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 1199, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 991, settings: { slidesToShow: 5, arrows: false } },
      { breakpoint: 767, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 575, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 479, settings: { slidesToShow: 2, arrows: false } },
    ],
  };

  //  show tab
  const [activeTab, setActiveTab] = useState("description");

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Breadcumb parentTitle={"Sản phẩm"} title={"Áo thun"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  {/*=======  single product main content area  =======*/}
                  <div className="single-product-main-content-area section-space">
                    <div className="row">
                      <div className="col-lg-6">
                        {/*=======  product details slider area  =======*/}
                        <div className="product-details-slider-area">
                          <div className="big-image-wrapper">
                            {/* Slider lớn */}
                            <Slider
                              {...bigImageSettings}
                              className="big-image-slider"
                              asNavFor={nav2} // Liên kết với slider nhỏ
                              ref={(slider1) => setNav1(slider1)} // Gán tham chiếu slider lớn
                            >
                              <div className="single-image">
                                <img src={big1} alt="" width={600} height={800} />
                              </div>
                              <div className="single-image">
                                <img src={big2} alt="" width={600} height={800} />
                              </div>
                              <div className="single-image">
                                <img src={big3} alt="" width={600} height={800} />
                              </div>
                              <div className="single-image">
                                <img src={big4} alt="" width={600} height={800} />
                              </div>
                              <div className="single-image">
                                <img src={big5} alt="" width={600} height={800} />
                              </div>
                            </Slider>
                          </div>
                          <div className="product-details-small-image-slider-wrapper">
                            {/* Slider nhỏ */}
                            <Slider
                              {...smallImageSettings}
                              className="small-image-slider"
                              asNavFor={nav1} // Liên kết với slider lớn
                              ref={(slider2) => setNav2(slider2)} // Gán tham chiếu slider nhỏ
                            >
                              <div className="single-image">
                                <img src={big1} alt="" width={170} height={226} />
                              </div>
                              <div className="single-image">
                                <img src={big2} alt="" width={170} height={226} />
                              </div>
                              <div className="single-image">
                                <img src={big3} alt="" width={170} height={226} />
                              </div>
                              <div className="single-image">
                                <img src={big4} alt="" width={170} height={226} />
                              </div>
                              <div className="single-image">
                                <img src={big5} alt="" width={170} height={226} />
                              </div>
                            </Slider>
                          </div>
                        </div>

                        {/*=======  End of product details slider area  =======*/}
                      </div>
                      <div className="col-lg-6">
                        {/*=======  single product content description  =======*/}
                        <div className="single-product-content-description">
                          <p className="single-info">
                            Brands <a href="shop-left-sidebar.html">Dolor</a>
                          </p>
                          <h4 className="product-title">Lorem ipsum dolor set amet decor</h4>
                          <div className="product-rating">
                            <span className="rating">
                              <i className="ion-android-star active" />
                              <i className="ion-android-star active" />
                              <i className="ion-android-star active" />
                              <i className="ion-android-star active" />
                              <i className="ion-android-star-outline" />
                            </span>
                            <span className="review-count">
                              {" "}
                              <a href="#">(2 reviews)</a> | <a href="#">Write A Review</a>{" "}
                            </span>
                          </div>
                          <p className="single-grid-product__price">
                            <span className="discounted-price">$100.00</span> <span className="main-price discounted">$120.00</span>
                          </p>
                          <p className="single-info">
                            Product Code: <span className="value">CODE123</span>{" "}
                          </p>
                          <p className="single-info">
                            Reward Points: <span className="value">200</span>{" "}
                          </p>
                          <p className="single-info">
                            Availability: <span className="value">In Stock</span>
                          </p>
                          <p className="product-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, delectus. Voluptates omnis distinctio vitae quo quia veniam
                            minima dolorem hic necessitatibus pariatur, quae fuga similique optio laboriosam assumenda voluptatum aperiam.
                          </p>
                          <div className="size mb-20">
                            <span className="title"> Size:</span> <br />
                            <select name="chooseSize" id="chooseSize" className="nice-select">
                              <option value={0}>XXL</option>
                              <option value={0}>L</option>
                              <option value={0}>M</option>
                              <option value={0}>S</option>
                            </select>
                          </div>
                          <div className="color mb-20">
                            <span className="title"> Color:</span> <br />
                            <a href="#">
                              <span className="color-block color-choice-1" />
                            </a>
                            <a href="#">
                              <span className="color-block color-choice-2" />
                            </a>
                            <a href="#">
                              <span className="color-block color-choice-3 active" />
                            </a>
                          </div>
                          <div className="product-actions">
                            <div className="quantity-selection">
                              <label>Qty</label>
                              <input type="number" defaultValue={1} min={1} />
                            </div>
                            <div className="product-buttons">
                              <a className="cart-btn" href="#">
                                {" "}
                                <i className="ion-bag" /> ADD TO CART
                              </a>
                              <span className="wishlist-compare-btn">
                                <a>
                                  {" "}
                                  <i className="ion-heart" />
                                </a>
                                <a>
                                  {" "}
                                  <i className="ion-android-options" />
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className="social-share-buttons mt-20">
                            <h5>share this product</h5>
                            <ul>
                              <li>
                                <a className="twitter" href="#">
                                  <i className="fa fa-twitter" />
                                </a>
                              </li>
                              <li>
                                <a className="facebook" href="#">
                                  <i className="fa fa-facebook" />
                                </a>
                              </li>
                              <li>
                                <a className="google-plus" href="#">
                                  <i className="fa fa-google-plus" />
                                </a>
                              </li>
                              <li>
                                <a className="pinterest" href="#">
                                  <i className="fa fa-pinterest" />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p className="single-info mb-0">
                            Tags: <a href="shop-left-sidebar.html">Dolor</a>, <a href="shop-left-sidebar.html">Ipsum</a>,{" "}
                            <a href="shop-left-sidebar.html">Lorem</a>{" "}
                          </p>
                        </div>
                        {/*=======  End of single product content description  =======*/}
                      </div>
                    </div>
                  </div>
                  {/*=======  End of single product main content area  =======*/}
                  {/*=======  product description review   =======*/}
                  <div className="product-description-review-area">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tab-slider-wrapper product-description-review-container section-space--inner">
                          {/* Tab Navigation */}
                          <nav>
                            <div className="nav nav-tabs justify-content-center" role="tablist">
                              <a
                                className={`nav-item nav-link ${activeTab === "description" ? "active" : ""}`}
                                onClick={() => handleTabChange("description")}
                                role="tab"
                                aria-selected={activeTab === "description"}
                                style={{ cursor: "pointer" }}>
                                Description
                              </a>
                              <a
                                className={`nav-item nav-link ${activeTab === "review" ? "active" : ""}`}
                                onClick={() => handleTabChange("review")}
                                role="tab"
                                aria-selected={activeTab === "review"}
                                style={{ cursor: "pointer" }}>
                                Reviews (1)
                              </a>
                            </div>
                          </nav>

                          {/* Tab Content */}
                          <div className="tab-content">
                            {/* Description Tab */}
                            {activeTab === "description" && (
                              <div className="tab-pane fade show active">
                                <div className="product-description">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non
                                    est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate
                                    adipiscing cursus eu, suscipit id nulla.
                                  </p>
                                  <p>
                                    Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit.
                                    Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero
                                    hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus,
                                    consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget.
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === "review" && (
                              <div className="tab-pane fade show active">
                                <div className="product-rating-wrap">
                                  <div className="pro-avg-rating">
                                    <h4>
                                      4.5 <span>(Overall)</span>
                                    </h4>
                                    <span>Based on 9 Comments</span>
                                  </div>
                                  <div className="rating-list">
                                    <div className="sin-list float-start">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <span>(5)</span>
                                    </div>
                                    <div className="sin-list float-start">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o" />
                                      <span>(3)</span>
                                    </div>
                                    <div className="sin-list float-start">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o" />
                                      <i className="fa fa-star-o" />
                                      <span>(1)</span>
                                    </div>
                                  </div>
                                  <div className="ratings-wrapper">
                                    <div className="sin-ratings">
                                      <div className="rating-author">
                                        <h3>Cristopher Lee</h3>
                                        <div className="rating-star">
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <span>(5)</span>
                                        </div>
                                      </div>
                                      <p>
                                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem
                                        sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli
                                      </p>
                                    </div>
                                    <div className="sin-ratings">
                                      <div className="rating-author">
                                        <h3>Rashed Mahmud</h3>
                                        <div className="rating-star">
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <i className="fa fa-star" />
                                          <span>(5)</span>
                                        </div>
                                      </div>
                                      <p>
                                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem
                                        sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli
                                      </p>
                                    </div>
                                  </div>
                                  <div className="rating-form-wrapper fix">
                                    <h3>Add your Comments</h3>
                                    <form action="#">
                                      <div className="rating-form row">
                                        <div className="col-12 mb-15">
                                          <h5>Rating:</h5>
                                          <div className="rating-star fix">
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                            <i className="fa fa-star-o" />
                                          </div>
                                        </div>
                                        <div className="col-md-6 col-12 form-group">
                                          <label htmlFor="name">Name:</label>
                                          <input id="name" placeholder="Name" type="text" />
                                        </div>
                                        <div className="col-md-6 col-12 form-group">
                                          <label htmlFor="email">Email:</label>
                                          <input id="email" placeholder="Email" type="text" />
                                        </div>
                                        <div className="col-12 form-group">
                                          <label htmlFor="your-review">Your Review:</label>
                                          <textarea name="review" id="your-review" placeholder="Write a review" />
                                        </div>
                                        <div className="col-12">
                                          <input defaultValue="add review" type="submit" />
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*=======  End of product description review   =======*/}
                  {/*====================  single row slider ====================*/}
                  <div className="single-row-slider-area section-space--inner-top">
                    <div className="row">
                      <div className="col-lg-12">
                        {/*=======  section title  =======*/}
                        <div className="section-title-wrapper text-center section-space--half">
                          <h2 className="section-title">Related Products</h2>
                          <p className="section-subtitle">
                            Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas.
                          </p>
                        </div>
                        {/*=======  End of section title  =======*/}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        {/*=======  single row slider wrapper  =======*/}
                        <div className="single-row-slider-wrapper">
                          <Slider {...settings}>
                            {[1, 2, 3, 4, 5].map((item) => (
                              <div className="col" key={item}>
                                <div className="single-grid-product">
                                  <div className="single-grid-product__image">
                                    <div className="single-grid-product__label">
                                      <span className={item === 2 ? "sale" : "new"}>{item === 2 ? "-20%" : "New"}</span>
                                    </div>
                                    <a href="single-product.html">
                                      <img width={600} height={800} src={`assets/img/products/${item}-600x800.webp`} className="img-fluid" alt="" />
                                      <img width={600} height={800} src={`assets/img/products/${item}_1-600x800.webp`} className="img-fluid" alt="" />
                                    </a>
                                    <div className="hover-icons">
                                      <a href="#">
                                        <i className="ion-bag" />
                                      </a>
                                      <a href="#">
                                        <i className="ion-heart" />
                                      </a>
                                      <a href="#">
                                        <i className="ion-android-options" />
                                      </a>
                                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view-modal-container">
                                        <i className="ion-android-open" />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="single-grid-product__content">
                                    <div className="single-grid-product__category-rating">
                                      <span className="category">
                                        <a href="shop-left-sidebar.html">{item % 2 === 0 ? "Decor" : "Vase"}</a>
                                      </span>
                                      <span className="rating">
                                        <i className="ion-android-star active" />
                                        <i className="ion-android-star active" />
                                        <i className="ion-android-star active" />
                                        <i className="ion-android-star active" />
                                        <i className="ion-android-star-outline" />
                                      </span>
                                    </div>
                                    <h3 className="single-grid-product__title">
                                      <a href="single-product.html">Cillum dolore lorem ipsum decoration item</a>
                                    </h3>
                                    <p className="single-grid-product__price">
                                      <span className="discounted-price">${item * 20}.00</span>{" "}
                                      <span className="main-price discounted">${item * 30}.00</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                        {/*=======  End of single row slider wrapper  =======*/}
                      </div>
                    </div>
                  </div>
                  {/*====================  End of single row slider  ====================*/}
                </div>
              </div>
              {/*=======  End of page wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
