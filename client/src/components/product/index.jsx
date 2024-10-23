import React, { useEffect, useState } from "react";
import Breadcumb from "../layouts/breadcumb";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState([]);

  // hàm chạy lần đầu lấy data
  useEffect(() => {
    handleGetList();
  }, []);

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/product`);

      if (response.status === 200) {
        setData(response.data);
        // lưu list category vào store
        // dispatch(setListCategory(response.data));
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };
  console.log(data);
  

  return (
    <div>
      <Breadcumb parentTitle={"Sản phẩm"} title={"Áo thun"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  shop page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  <div className="row">
                    <div className="col-lg-12">
                      {/*=======  shop page header  =======*/}
                      <div className="shop-header">
                        <div className="shop-header__left">
                          <div className="grid-icons">
                            <button
                              data-target="grid three-column"
                              data-tippy={3}
                              data-tippy-inertia="true"
                              data-tippy-animation="fade"
                              data-tippy-delay={50}
                              data-tippy-arrow="true"
                              data-tippy-theme="roundborder"
                              className="three-column"
                            />
                            <button
                              data-target="grid four-column"
                              data-tippy={4}
                              data-tippy-inertia="true"
                              data-tippy-animation="fade"
                              data-tippy-delay={50}
                              data-tippy-arrow="true"
                              data-tippy-theme="roundborder"
                              className="four-column d-none d-lg-block"
                            />
                            <button
                              data-target="grid five-column"
                              data-tippy={5}
                              data-tippy-inertia="true"
                              data-tippy-animation="fade"
                              data-tippy-delay={50}
                              data-tippy-arrow="true"
                              data-tippy-theme="roundborder"
                              className="five-column d-none d-lg-block"
                            />
                            <button
                              data-target="list"
                              data-tippy="List"
                              data-tippy-inertia="true"
                              data-tippy-animation="fade"
                              data-tippy-delay={50}
                              data-tippy-arrow="true"
                              data-tippy-theme="roundborder"
                              className="active list-view"
                            />
                          </div>
                          <div className="shop-header__left__message">Showing 1 to 9 of 15 (2 Pages)</div>
                        </div>
                        <div className="shop-header__right">
                          <div className="single-select-block d-inline-block">
                            <span className="select-title">Show:</span>
                            <select>
                              <option value={1}>10</option>
                              <option value={2}>20</option>
                              <option value={3}>30</option>
                              <option value={4}>40</option>
                            </select>
                          </div>
                          <div className="single-select-block d-inline-block">
                            <span className="select-title">Sort By:</span>
                            <select className="pr-0">
                              <option value={1}>Default</option>
                              <option value={2}>Name (A-Z)</option>
                              <option value={3}>Price (min - max)</option>
                              <option value={4}>Color</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {/*=======  End of shop page header  =======*/}
                    </div>
                    <div className="col-lg-12">
                      {/*=======  shop page content  =======*/}
                      <div className="shop-page-content">
                        <div className="row shop-product-wrap list">
                          {data.map((item) => (
                            <div className="col-12 col-lg-4 col-md-4 col-sm-6">
                              {/*=======  product grid view  =======*/}
                              <div className="single-grid-product grid-view-product">
                                <div className="single-grid-product__image">
                                  <div className="single-grid-product__label">
                                    <span className="sale">-20%</span>
                                    <span className="new">New</span>
                                  </div>
                                  <a href="single-product111.html111">
                                    {
                                      item?.image.map(x => (
                                        <img width={600} height={800} src={`http://localhost:5555${x.img_url}`}className="img-fluid" alt="" />
                                      ))
                                    }
                                  </a>
                                  <div className="hover-icons">
                                    <a href="javascript:void(0)">
                                      <i className="ion-bag" />
                                    </a>
                                    <a href="javascript:void(0)">
                                      <i className="ion-heart" />
                                    </a>
                                    <a href="javascript:void(0)">
                                      <i className="ion-android-options" />
                                    </a>
                                    <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#quick-view-modal-container">
                                      <i className="ion-android-open" />
                                    </a>
                                  </div>
                                </div>
                                <div className="single-grid-product__content">
                                  <div className="single-grid-product__category-rating">
                                    <span className="category">
                                      <a href="shop-left-sidebar.html">Decor</a>
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
                                    {" "}
                                    <a href="single-product.html">Cillum dolore lorem ipsum decoration item</a>
                                  </h3>
                                  <p className="single-grid-product__price">
                                    <span className="discounted-price">$100.00</span> <span className="main-price discounted">$120.00</span>
                                  </p>
                                </div>
                              </div>
                              {/*=======  End of product grid view  =======*/}
                              {/*=======  list view product  =======*/}
                              <div className="single-grid-product single-grid-product--list-view list-view-product">
                                <div className="single-grid-product__image single-grid-product--list-view__image">
                                  <div className="single-grid-product__label">
                                    <span className="sale">-20%</span>
                                    <span className="new">New</span>
                                  </div>
                                  <a href="single-product.html">
                                    {
                                      item?.image.map(x => (
                                        <img width={600} height={800} src={`http://localhost:5555${x.img_url}`} className="img-fluid" alt="" />
                                      ))
                                    }
                                  </a>
                                  <div className="hover-icons">
                                    <a href="javascript:void(0)">
                                      <i className="ion-bag" />
                                    </a>
                                    <a href="javascript:void(0)">
                                      <i className="ion-heart" />
                                    </a>
                                    <a href="javascript:void(0)">
                                      <i className="ion-android-options" />
                                    </a>
                                    <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#quick-view-modal-container">
                                      <i className="ion-android-open" />
                                    </a>
                                  </div>
                                </div>
                                <div className="single-grid-product__content single-grid-product--list-view__content">
                                  <div className="category">
                                    <a href="shop-left-sidebar.html">Decor</a>
                                  </div>
                                  <h3 className="single-grid-product__title single-grid-product--list-view__title">
                                    <a href="single-product.html">{item.name}</a>
                                  </h3>
                                  <div className="rating">
                                    <i className="ion-android-star active" />
                                    <i className="ion-android-star active" />
                                    <i className="ion-android-star active" />
                                    <i className="ion-android-star active" />
                                    <i className="ion-android-star-outline" />
                                  </div>
                                  <p className="single-grid-product__price single-grid-product--list-view__price">
                                    <span className="discounted-price">{
                                        item.variants[0]?.price
                                      }</span> <span className="main-price discounted">$120.00</span>
                                  </p>
                                  <p className="single-grid-product--list-view__product-short-desc">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate cupiditate provident praesentium, esse omnis
                                    quis!
                                  </p>
                                </div>
                              </div>
                              {/*=======  End of list view product  =======*/}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/*=======  pagination area =======*/}
                      <div className="pagination-area">
                        <div className="pagination-area__left">Showing 1 to 9 of 11 (2 Pages)</div>
                        <div className="pagination-area__right">
                          <ul className="pagination-section">
                            <li>
                              <a className="active" href="#">
                                1
                              </a>
                            </li>
                            <li>
                              <a href="#">2</a>
                            </li>
                            <li>
                              <a href="#">&gt;</a>
                            </li>
                            <li>
                              <a href="#">&gt;|</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/*=======  End of pagination area  =======*/}
                      {/*=======  End of shop page content  =======*/}
                    </div>
                  </div>
                </div>
              </div>
              {/*=======  End of shop page wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter-area section-space--inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="newsletter-wrapper">
                <p className="small-text">Special Ofers For Subscribers</p>
                <h3 className="title">Ten Percent Member Discount</h3>
                <p className="short-desc">
                  Subscribe to our newsletters now and stay up to date with new collections, the latest lookbooks and exclusive offers.
                </p>
                <div className="newsletter-form">
                  <form id="mc-form" className="mc-form">
                    <input type="email" placeholder="Enter Your Email Address Here..." required="" />
                    <button type="submit" value="submit">
                      SUBSCRIBE
                    </button>
                  </form>
                </div>
                {/* mailchimp-alerts Start */}
                <div className="mailchimp-alerts">
                  <div className="mailchimp-submitting" />
                  {/* mailchimp-submitting end */}
                  <div className="mailchimp-success" />
                  {/* mailchimp-success end */}
                  <div className="mailchimp-error" />
                  {/* mailchimp-error end */}
                </div>
                {/* mailchimp-alerts end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
