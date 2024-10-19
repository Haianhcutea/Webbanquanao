import React from "react";

import Slider from "react-slick";
import { Tabs } from "antd";
//
import products_3 from "@/assets/img/products/3-600x800.webp";
import products_3_1 from "@/assets/img/products/3_1-600x800.webp";

const OurProducts = () => {
  const sliderSettings = {
    slidesToShow: 4, // Hiển thị 4 slide cùng lúc
    slidesToScroll: 1, // Di chuyển 1 slide mỗi lần cuộn
    arrows: true, // Hiển thị mũi tên điều hướng
    autoplay: false, // Không tự động chạy slide
    autoplaySpeed: 5000, // Nếu autoplay: true, thời gian chờ giữa các lần cuộn là 5000ms
    speed: 1000, // Tốc độ chuyển slide (1 giây)
    infinite: false, // Không cuộn vô tận
    prevArrow: (
      <button className="slick-prev">
        {" "}
        <i className="ion-chevron-left" />{" "}
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        {" "}
        <i className="ion-chevron-right" />{" "}
      </button>
    ),
    responsive: [
      { breakpoint: 1501, settings: { slidesToShow: 4 } }, // Trên 1501px: 4 slide
      { breakpoint: 1199, settings: { slidesToShow: 4, arrows: false } }, // Trên 1199px: 4 slide, không có mũi tên
      { breakpoint: 991, settings: { slidesToShow: 3, arrows: false } }, // Trên 991px: 3 slide
      { breakpoint: 767, settings: { slidesToShow: 2, arrows: false } }, // Trên 767px: 2 slide
      { breakpoint: 575, settings: { slidesToShow: 2, arrows: false } }, // Trên 575px: 2 slide
      { breakpoint: 479, settings: { slidesToShow: 1, arrows: false } }, // Dưới 479px: 1 slide
    ],
  };

  const items = [
    {
      key: "1",
      label: "Decoration",
      className: "nav-item nav-link",
      children: (
        <div className="single-row-slider-wrapper slider-gap--30">
          <Slider {...sliderSettings}>
            <div className="col">
              {/* Single product */}
              <div className="single-grid-product">
                <div className="single-grid-product__image">
                  <a href="single-product.html">
                    <img width={600} height={800} src={products_3} className="img-fluid" alt="" />
                    <img width={600} height={800} src={products_3_1} className="img-fluid" alt="" />
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
                      <a href="shop-left-sidebar.html">Furniture</a>
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
                    <span className="main-price">$120.00</span>
                  </p>
                </div>
              </div>
              {/* End of single product */}
            </div>
            <div className="col">
              {/* Single product */}
              <div className="single-grid-product">
                <div className="single-grid-product__image">
                  <a href="single-product.html">
                    <img width={600} height={800} src={products_3} className="img-fluid" alt="" />
                    <img width={600} height={800} src={products_3_1} className="img-fluid" alt="" />
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
                      <a href="shop-left-sidebar.html">Furniture</a>
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
                    <span className="main-price">$120.00</span>
                  </p>
                </div>
              </div>
              {/* End of single product */}
            </div>
            <div className="col">
              {/* Single product */}
              <div className="single-grid-product">
                <div className="single-grid-product__image">
                  <a href="single-product.html">
                    <img width={600} height={800} src={products_3} className="img-fluid" alt="" />
                    <img width={600} height={800} src={products_3_1} className="img-fluid" alt="" />
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
                      <a href="shop-left-sidebar.html">Furniture</a>
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
                    <span className="main-price">$120.00</span>
                  </p>
                </div>
              </div>
              {/* End of single product */}
            </div>
            <div className="col">
              {/* Single product */}
              <div className="single-grid-product">
                <div className="single-grid-product__image">
                  <a href="single-product.html">
                    <img width={600} height={800} src={products_3} className="img-fluid" alt="" />
                    <img width={600} height={800} src={products_3_1} className="img-fluid" alt="" />
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
                      <a href="shop-left-sidebar.html">Furniture</a>
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
                    <span className="main-price">$120.00</span>
                  </p>
                </div>
              </div>
              {/* End of single product */}
            </div>
          </Slider>
        </div>
      ),
    },
    {
      key: "2",
      label: "Lighting",
      className: "nav-item nav-link",
      children: <></>,
    },
    {
      key: "3",
      label: "Storage",
      className: "nav-item nav-link",

      children: <></>,
    },
    {
      key: "4",
      label: "Living Room",
      className: "nav-item nav-link",

      children: <></>,
    },
  ];
  return <Tabs items={items}></Tabs>;
};

export default OurProducts;