import React, { useEffect, useState } from "react";

import logo from "@/assets/img/logo.webp";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);
  const [isMiniCartActive, setIsMiniCartActive] = useState(false);

  useEffect(() => {
    // Sự kiện đóng khi click ra ngoài.
    const handleClickOutside = (e) => {
      // Kiểm tra nếu click ra ngoài của cả settings và mini-cart
      if (!e.target.closest(".header-settings-icon") && !e.target.closest(".mini-cart") && !e.target.closest(".header-cart-icon")) {
        setIsSettingsMenuActive(false);
        setIsMiniCartActive(false);
        document.body.classList.remove("active-overlay");
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // handle click mở setting
  const handleSettingsClick = (e) => {
    e.preventDefault();
    setIsSettingsMenuActive(!isSettingsMenuActive);
    setIsMiniCartActive(false); // Đóng mini cart nếu settings menu được mở
    document.body.classList.add("active-overlay");
  };

  // handle click mở giỏ hàng
  const handleMiniCartClick = (e) => {
    e.preventDefault();
    setIsMiniCartActive(!isMiniCartActive);
    setIsSettingsMenuActive(false); // Đóng settings menu nếu minicart được mở
    document.body.classList.add("active-overlay");
  };

  return (
    <div className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/*=======  header wrapper  =======*/}
            <div className="header-wrapper d-none d-lg-flex">
              {/* logo */}
              <div className="logo">
                <a>
                  <img width={93} height={25} src={logo} className="img-fluid" alt="" />
                </a>
              </div>
              {/* menu wrapper */}
              <div className="navigation-menu-wrapper">
                <nav>
                  <ul>
                    <li>
                      <Link to="/home">HOME</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <a>Sản phẩm</a>
                      <ul className="sub-menu">
                        <li>
                          <Link to="/product">Danh sách sản phẩm</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="shop-left-sidebar.html">SHOP</a>
                      <ul className="mega-menu four-column">
                        <li>
                          <a href="#">Shop Grid</a>
                          <ul>
                            <li>
                              <a href="shop-3-column.html">shop 3 column</a>
                            </li>
                            <li>
                              <a href="shop-4-column.html">shop 4 column</a>
                            </li>
                            <li>
                              <a href="shop-left-sidebar.html">shop left sidebar</a>
                            </li>
                            <li>
                              <a href="shop-right-sidebar.html">shop right sidebar</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="shop-list-left-sidebar.html">Shop List</a>
                          <ul>
                            <li>
                              <a href="shop-list.html">shop List</a>
                            </li>
                            <li>
                              <a href="shop-list-left-sidebar.html">shop List Left Sidebar</a>
                            </li>
                            <li>
                              <a href="shop-list-right-sidebar.html">shop List Right Sidebar</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product.html">Single Product</a>
                          <ul>
                            <li>
                              <a href="single-product.html">Single Product</a>
                            </li>
                            <li>
                              <a href="single-product-variable.html">Single Product variable</a>
                            </li>
                            <li>
                              <a href="single-product-affiliate.html">Single Product affiliate</a>
                            </li>
                            <li>
                              <a href="single-product-group.html">Single Product group</a>
                            </li>
                            <li>
                              <a href="single-product-tabstyle-2.html">Tab Style 2</a>
                            </li>
                            <li>
                              <a href="single-product-tabstyle-3.html">Tab Style 3</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="single-product.html">Single Product</a>
                          <ul>
                            <li>
                              <a href="single-product-gallery-left.html">Gallery Left</a>
                            </li>
                            <li>
                              <a href="single-product-gallery-right.html">Gallery Right</a>
                            </li>
                            <li>
                              <a href="single-product-sticky-left.html">Sticky Left</a>
                            </li>
                            <li>
                              <a href="single-product-sticky-right.html">Sticky Right</a>
                            </li>
                            <li>
                              <a href="single-product-slider-box.html">Slider Box</a>
                            </li>
                          </ul>
                        </li>
                        <li className="megamenu-banner d-none d-lg-block mt-30 w-100">
                          <a href="shop-left-sidebar.html" className="mb-0">
                            <img width={920} height={183} src="assets/img/banners/img-bottom-menu.webp" className="img-fluid" alt="" />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="blog-left-sidebar.html">BLOG</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="blog-left-sidebar.html">Blog Left Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-right-sidebar.html">Blog Right Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-post-left-sidebar.html">Blog Post Left Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-post-right-sidebar.html">Blog Post Right Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-post-image-format.html">Blog Post Image Format</a>
                        </li>
                        <li>
                          <a href="blog-post-image-gallery.html">Blog Post Image Gallery</a>
                        </li>
                        <li>
                          <a href="blog-post-audio-format.html">Blog Post Audio Format</a>
                        </li>
                        <li>
                          <a href="blog-post-video-format.html">Blog Post Video Format</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact.html">CONTACT</a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* header icon */}
              <div className="header-icon-wrapper">
                <ul className="icon-list">
                  <li>
                    <div className="header-cart-icon">
                      <a href="#" id="minicart-trigger" onClick={handleMiniCartClick}>
                        <i className="ion-bag" />
                        <span className="counter">3</span>
                      </a>
                      {/* mini cart  */}
                      <div className={`mini-cart ${isMiniCartActive ? "active" : ""}`} id="mini-cart">
                        <div className="cart-items-wrapper ps-scroll">
                          <div className="single-cart-item">
                            <a href="javascript:void(0)" className="remove-icon">
                              <i className="ion-android-close" />
                            </a>
                            <div className="image">
                              <a href="single-product.html">
                                <img width={80} height={106} src="assets/img/products/product-1-80x106.webp" className="img-fluid" alt="" />
                              </a>
                            </div>
                            <div className="content">
                              <p className="product-title">
                                <a href="single-product.html">Cillum dolore furniture</a>
                              </p>
                              <p className="count">
                                <span>1 x </span> $402
                              </p>
                            </div>
                          </div>
                          <div className="single-cart-item">
                            <a href="javascript:void(0)" className="remove-icon">
                              <i className="ion-android-close" />
                            </a>
                            <div className="image">
                              <a href="single-product.html">
                                <img width={80} height={106} src="assets/img/products/product-2-80x106.webp" className="img-fluid" alt="" />
                              </a>
                            </div>
                            <div className="content">
                              <p className="product-title">
                                <a href="single-product.html">Lorem ipsum furniture</a>
                              </p>
                              <p className="count">
                                <span>1 x </span> $500
                              </p>
                            </div>
                          </div>
                          <div className="single-cart-item">
                            <a href="javascript:void(0)" className="remove-icon">
                              <i className="ion-android-close" />
                            </a>
                            <div className="image">
                              <a href="single-product.html">
                                <img width={80} height={106} src="assets/img/products/product-3-80x106.webp" className="img-fluid" alt="" />
                              </a>
                            </div>
                            <div className="content">
                              <p className="product-title">
                                <a href="single-product.html">Cillum dolore tool</a>
                              </p>
                              <p className="count">
                                <span>1 x </span> $607
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="cart-calculation">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="text-start">Sub-Total :</td>
                                <td className="text-end">$220.00</td>
                              </tr>
                              <tr>
                                <td className="text-start">Eco Tax (-2.00) :</td>
                                <td className="text-end">$6.00</td>
                              </tr>
                              <tr>
                                <td className="text-start">VAT (20%) :</td>
                                <td className="text-end">$44.00</td>
                              </tr>
                              <tr>
                                <td className="text-start">Total :</td>
                                <td className="text-end">$270.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="cart-buttons">
                          <a href="cart.html">VIEW CART</a>
                          <a href="checkout.html">CHECKOUT</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="header-settings-icon">
                      <li>
                        {/* Settings Trigger */}
                        <a href="javascript:void(0)" id="header-settings-trigger" onClick={handleSettingsClick}>
                          <div className="setting-button">
                            <span />
                            <span />
                            <span />
                          </div>
                        </a>

                        {/* Settings Menu */}
                        <div className={`settings-menu-wrapper ${isSettingsMenuActive ? "active" : ""}`} id="settings-menu-wrapper">
                          <div className="single-settings-block">
                            <h4 className="title">MY ACCOUNT</h4>
                            <ul>
                              <li>
                                <a href="login-register.html">Register</a>
                              </li>
                              <li>
                                <a href="login-register.html">Login</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/*=======  End of header wrapper  =======*/}
            {/*=======  mobile navigation area  =======*/}
            <div className="header-mobile-navigation d-block d-lg-none">
              <div className="row align-items-center">
                <div className="col-6 col-md-6">
                  <div className="header-logo">
                    <a href="index.html">
                      <img width={93} height={25} src="assets/img/logo.webp" className="img-fluid" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="mobile-navigation text-end">
                    <div className="header-icon-wrapper">
                      <ul className="icon-list justify-content-end">
                        <li>
                          <div className="header-cart-icon">
                            <a href="cart.html">
                              <i className="ion-bag" />
                              <span className="counter">3</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="mobile-menu-icon" id="mobile-menu-trigger">
                            <i className="fa fa-bars" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=======  End of mobile navigation area  =======*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
