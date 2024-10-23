import React, { useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel";
import $ from "jquery";

//
import category_1 from "@/assets/img/category/img1-top-eposi1.webp";
import category_2 from "@/assets/img/category/img2-top-eposi1.webp";
import category_3 from "@/assets/img/category/img3-top-eposi1.webp";
import category_4 from "@/assets/img/category/img4-top-eposi1.webp";
//
import banners_1 from "@/assets/img/banners/img1-middle-eposi1.webp";
import banners_2 from "@/assets/img/banners/img2-middle-eposi1.webp";

import OurProducts from "./OurProducts";

const Home = () => {
  const settings = {
    dots: true, // Hiển thị dots
    infinite: true, // Slide quay vòng
    speed: 1000, // Tốc độ chuyển slide
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true, // Hiệu ứng chuyển mượt mà
    arrows: true, // Hiển thị nút mũi tên
    prevArrow: (
      <button class="slick-next slick-arrow" style="">
        <i class="ion-chevron-right"></i>
      </button>
    ), // Nút mũi tên trái
    nextArrow: (
      <button class="slick-prev slick-arrow" style="">
        <i class="ion-chevron-left"></i>
      </button>
    ), // Nút mũi tên phải
  };

  // tạo slick kiểu khác
  useEffect(() => {
    // Khởi tạo Slick Slider sau khi component được mount
    $(".ht-slick-slider.slider-1").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
      infinite: true,
      arrows: true,
      prevArrow: "<button type='button' class='slick-prev'><i class='ion-ios-arrow-left'></i></button>",
      nextArrow: "<button type='button' class='slick-next'><i class='ion-ios-arrow-right'></i></button>",
      responsive: [
        { breakpoint: 1501, settings: { slidesToShow: 1 } },
        { breakpoint: 1199, settings: { slidesToShow: 1, arrows: false } },
        { breakpoint: 991, settings: { slidesToShow: 1, arrows: false } },
        { breakpoint: 767, settings: { slidesToShow: 1, arrows: false } },
        { breakpoint: 575, settings: { slidesToShow: 1, arrows: false } },
        { breakpoint: 479, settings: { slidesToShow: 1, arrows: false } },
      ],
    });

    $(".ht-slick-slider.slider-2").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
      infinite: true,
      responsive: [
        { breakpoint: 1501, settings: { slidesToShow: 3 } },
        { breakpoint: 1199, settings: { slidesToShow: 3 } },
        { breakpoint: 991, settings: { slidesToShow: 2 } },
        { breakpoint: 767, settings: { slidesToShow: 1 } },
        { breakpoint: 575, settings: { slidesToShow: 1 } },
        { breakpoint: 479, settings: { slidesToShow: 1 } },
      ],
    });
  }, []);

  return (
    <div>
      <div className="hero-slider-area section-space">
        <div className="container wide">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-slider-wrapper">
                <Slider {...settings}>
                  {/* Slide 1 */}
                  <div className="single-slider-item">
                    <div className="hero-slider-item-wrapper hero-slider-bg-1">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="hero-slider-content hero-slider-content--left-space">
                              <p className="slider-title slider-title--big-light">AMAZING PRODUCT!</p>
                              <p className="slider-title slider-title--big-bold">WALL CLOCK</p>
                              <p className="slider-title slider-title--small">
                                Let your Wall reflect the luxurious side of you with our Unique Design 24ct.gold plated Wall Clock.
                              </p>
                              <a className="hero-slider-button" href="shop-left-sidebar.html">
                                <i className="ion-ios-plus-empty" /> SHOP NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 */}
                  <div className="single-slider-item">
                    <div className="hero-slider-item-wrapper hero-slider-bg-2">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="hero-slider-content hero-slider-content--left-space">
                              <p className="slider-title slider-title--big-light">AMAZING PRODUCT!</p>
                              <p className="slider-title slider-title--big-bold">DECOR CHAIR</p>
                              <p className="slider-title slider-title--small">An elegant selection of chairs combining comfort & practicality.</p>
                              <a className="hero-slider-button" href="shop-left-sidebar.html">
                                <i className="ion-ios-plus-empty" /> SHOP NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 */}
                  <div className="single-slider-item">
                    <div className="hero-slider-item-wrapper hero-slider-bg-3">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="hero-slider-content hero-slider-content--left-space">
                              <p className="slider-title slider-title--big-light">WALNUT TIME SIGNAL</p>
                              <p className="slider-title slider-title--big-bold">WALL CLOCK</p>
                              <p className="slider-title slider-title--small">
                                A striking centrepiece is conveyed through this Clock's integration with any modern style.
                              </p>
                              <a className="theme-button hero-slider-button" href="shop-left-sidebar.html">
                                <i className="ion-ios-plus-empty" /> SHOP NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="category-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  category wrapper  =======*/}
              <div className="category-wrapper">
                <div className="row row-10 masonry-category-layout">
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="shop-left-sidebar.html">
                          <img width={375} height={550} src={category_1} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">Storage</h3>
                        <a href="shop-left-sidebar.html">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="shop-left-sidebar.html">
                          <img width={380} height={265} src={category_2} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">Lighting</h3>
                        <a href="shop-left-sidebar.html">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="shop-left-sidebar.html">
                          <img src={category_3} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">Decoration</h3>
                        <a href="shop-left-sidebar.html">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                  <div className="col-lg-4 col-sm-6 grid-item">
                    {/*=======  single category item  =======*/}
                    <div className="single-category-item">
                      <div className="single-category-item__image">
                        <a href="shop-left-sidebar.html">
                          <img width={380} height={265} src={category_4} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="single-category-item__content">
                        <h3 className="title">Living Room</h3>
                        <a href="shop-left-sidebar.html">
                          Shop Now <i className="ion-android-arrow-dropright-circle" />
                        </a>
                      </div>
                    </div>
                    {/*=======  End of single category item  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of category wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>

      <div className="single-row-slider-tab-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  section title  =======*/}
              <div className="section-title-wrapper text-center section-space--half">
                <h2 className="section-title">Our Products</h2>
                <p className="section-subtitle">
                  Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas.
                </p>
              </div>
              {/*=======  End of section title  =======*/}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/*=======  tab slider wrapper  =======*/}
              <div className="tab-slider-wrapper">
                <div className="tab-product-navigation">
                  <OurProducts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-area section-space">
        <div className="container wide">
          <div className="row">
            <div className="col-lg-12">
              <div className="full-testimonial-wrapper testimonial-bg">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="testimonial-wrapper section-space--inner">
                        <div className="ht-slick-slider slider-1">
                          {/*=======  single testimonial item  =======*/}
                          {[
                            {
                              image: "assets/img/testimonial/testimor1-72x72.webp",
                              text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula.",
                              author: "Magdalena Valencia",
                            },
                            {
                              image: "assets/img/testimonial/testimor2-72x72.webp",
                              text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula.",
                              author: "Magdalena Valencia",
                            },
                            {
                              image: "assets/img/testimonial/testimor3-72x72.webp",
                              text: "Sed vel urna at dui iaculis gravida. Maecenas pretium, velit vitae placerat faucibus, velit quam facilisis elit, sit amet lacinia est est id ligula.",
                              author: "Magdalena Valencia",
                            },
                          ].map((testimonial, index) => (
                            <div className="single-testimonial-item row" key={index}>
                              <div className="col-lg-8 mx-auto">
                                <div className="single-testimonial-item__image">
                                  <img width={72} height={72} src={testimonial.image} className="img-fluid" alt="" />
                                </div>
                                <div className="single-testimonial-item__content">
                                  <p className="testimonial-text">{testimonial.text}</p>
                                  <img width={29} height={22} src="assets/img/icons/icon_testimonials.webp" alt="" />
                                  <p className="testimonial-author">{testimonial.author}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/*=======  End of single testimonial item  =======*/}
                        </div>
                      </div>
                      {/*=======  End of testimonial wrapper  =======*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-row-slider-tab-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  section title  =======*/}
              <div className="section-title-wrapper text-center section-space--half">
                <h2 className="section-title">Our Products</h2>
                <p className="section-subtitle">
                  Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas.
                </p>
              </div>
              {/*=======  End of section title  =======*/}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {/*=======  tab slider wrapper  =======*/}
              <div className="tab-slider-wrapper">
                <div className="tab-product-navigation">
                  <OurProducts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-hover-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  banner hover wrapper  =======*/}
              <div className="banner-hover-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    {/*=======  single hover banner  =======*/}
                    <div className="single-hover-banner">
                      <div className="single-hover-banner__image">
                        <a href="shop-left-sidebar.html">
                          <img width={570} height={319} src={banners_1} className="img-fluid" alt="" />
                        </a>
                        <div className="single-hover-banner__content">
                          <h4 className="small-text">Black Friday</h4>
                          <h3 className="big-text">Save Up To 50% Off</h3>
                          <a className="banner-link" href="shop-left-sidebar.html">
                            SHOP NOW
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*=======  End of single hover banner  =======*/}
                  </div>
                  <div className="col-md-6">
                    {/*=======  single hover banner  =======*/}
                    <div className="single-hover-banner">
                      <div className="single-hover-banner__image">
                        <a href="shop-left-sidebar.html">
                          <img width={570} height={319} src={banners_2} className="img-fluid" alt="" />
                        </a>
                        <div className="single-hover-banner__content">
                          <h4 className="small-text">Best Selling !</h4>
                          <h3 className="big-text">Living Room Up To 70% Off</h3>
                          <a className="banner-link" href="shop-left-sidebar.html">
                            SHOP NOW
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*=======  End of single hover banner  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of banner hover wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>

      <div className="feature-logo-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  feature logo wrapper  =======*/}
              <div className="feature-logo-wrapper section-space--inner-bottom">
                <div className="row">
                  <div className="col-md-4">
                    {/*=======  single feature logo  =======*/}
                    <div className="single-feature-logo">
                      <div className="single-feature-logo__image">
                        <img width={51} height={52} src="assets/img/icons/free_shipping.webp" className="img-fluid" alt="" />
                      </div>
                      <div className="single-feature-logo__content">
                        <h4 className="title">FREE SHIPPING WORLDWIDE</h4>
                        <p className="short-desc">We offer free shipping via Standard Shipping on orders over $200.00</p>
                      </div>
                    </div>
                    {/*=======  End of single feature logo  =======*/}
                  </div>
                  <div className="col-md-4">
                    {/*=======  single feature logo  =======*/}
                    <div className="single-feature-logo">
                      <div className="single-feature-logo__image">
                        <img width={52} height={52} src="assets/img/icons/money_back.webp" className="img-fluid" alt="" />
                      </div>
                      <div className="single-feature-logo__content">
                        <h4 className="title">MONEY BACK GUARANTEE</h4>
                        <p className="short-desc">If you're not satisfied with our product, we'll refund the purchase price*.</p>
                      </div>
                    </div>
                    {/*=======  End of single feature logo  =======*/}
                  </div>
                  <div className="col-md-4">
                    {/*=======  single feature logo  =======*/}
                    <div className="single-feature-logo">
                      <div className="single-feature-logo__image">
                        <img width={41} height={53} src="assets/img/icons/support247.webp" className="img-fluid" alt="" />
                      </div>
                      <div className="single-feature-logo__content">
                        <h4 className="title">ONLINE SUPPORT 24/7</h4>
                        <p className="short-desc">Our friendly support team is available to help you 24 hours a day, seven days a week</p>
                      </div>
                    </div>
                    {/*=======  End of single feature logo  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of feature logo wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>

      <div className="blog-post-slider-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  blog post slider border wrapper  =======*/}
              <div className="blog-post-slider-border-wrapper section-space--inner">
                <div className="row">
                  <div className="col-lg-12">
                    {/*=======  section title  =======*/}
                    <div className="section-title-wrapper text-center section-space--half">
                      <h2 className="section-title">Latest Blog Posts</h2>
                      <p className="section-subtitle">
                        Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas.
                      </p>
                    </div>
                    {/*=======  End of section title  =======*/}
                  </div>
                  <div className="col-lg-12">
                    {/*=======  blog post slider wrapper  =======*/}
                    <div className="blog-post-slider-wrapper">
                      <div className="ht-slick-slider slider-2">
                        <div className="col">
                          {/*=======  single slider post  =======*/}
                          <div className="single-slider-post">
                            <div className="single-slider-post__image">
                              <a href="blog-post-left-sidebar.html">
                                <img width={370} height={235} src="assets/img/blog/slider/1-370x235.webp" className="img-fluid" alt="" />
                              </a>
                              <div className="single-slider-post__date-sticker">
                                <span className="month">Oct</span>
                                <span className="day">02</span>
                              </div>
                            </div>
                            <div className="single-slider-post__content">
                              <h3 className="title">
                                <a href="blog-post-left-sidebar.html">Buy Used Furniture and Used Decor</a>
                              </h3>
                              <p className="post-meta">
                                by <a href="#">HasTech</a>
                              </p>
                              <p className="short-desc">It's no secret, engines and transmissions can be very expensive...</p>
                              <a href="blog-post-left-sidebar.html" className="blog-post-link">
                                Read More
                              </a>
                            </div>
                          </div>
                          {/*=======  End of single slider post  =======*/}
                        </div>
                        <div className="col">
                          {/*=======  single slider post  =======*/}
                          <div className="single-slider-post">
                            <div className="single-slider-post__image">
                              <a href="blog-post-left-sidebar.html">
                                <img width={370} height={235} src="assets/img/blog/slider/2-370x235.webp" className="img-fluid" alt="" />
                              </a>
                              <div className="single-slider-post__date-sticker">
                                <span className="month">Oct</span>
                                <span className="day">03</span>
                              </div>
                            </div>
                            <div className="single-slider-post__content">
                              <h3 className="title">
                                <a href="blog-post-left-sidebar.html">Get Your Furniture Ready for the Summer!</a>
                              </h3>
                              <p className="post-meta">
                                by <a href="#">HasTech</a>
                              </p>
                              <p className="short-desc">It's no secret, engines and transmissions can be very expensive...</p>
                              <a href="blog-post-left-sidebar.html" className="blog-post-link">
                                Read More
                              </a>
                            </div>
                          </div>
                          {/*=======  End of single slider post  =======*/}
                        </div>
                        <div className="col">
                          {/*=======  single slider post  =======*/}
                          <div className="single-slider-post">
                            <div className="single-slider-post__image">
                              <a href="blog-post-left-sidebar.html">
                                <img width={370} height={235} src="assets/img/blog/slider/3-370x235.webp" className="img-fluid" alt="" />
                              </a>
                              <div className="single-slider-post__date-sticker">
                                <span className="month">Oct</span>
                                <span className="day">04</span>
                              </div>
                            </div>
                            <div className="single-slider-post__content">
                              <h3 className="title">
                                <a href="blog-post-left-sidebar.html">Minor Wreck? We Got The Furniture!</a>
                              </h3>
                              <p className="post-meta">
                                by <a href="#">HasTech</a>
                              </p>
                              <p className="short-desc">It's no secret, engines and transmissions can be very expensive...</p>
                              <a href="blog-post-left-sidebar.html" className="blog-post-link">
                                Read More
                              </a>
                            </div>
                          </div>
                          {/*=======  End of single slider post  =======*/}
                        </div>
                        <div className="col">
                          {/*=======  single slider post  =======*/}
                          <div className="single-slider-post">
                            <div className="single-slider-post__image">
                              <a href="blog-post-left-sidebar.html">
                                <img width={370} height={235} src="assets/img/blog/slider/4-370x235.webp" className="img-fluid" alt="" />
                              </a>
                              <div className="single-slider-post__date-sticker">
                                <span className="month">Oct</span>
                                <span className="day">05</span>
                              </div>
                            </div>
                            <div className="single-slider-post__content">
                              <h3 className="title">
                                <a href="blog-post-left-sidebar.html">Purchasing Furniture in our Online Store</a>
                              </h3>
                              <p className="post-meta">
                                by <a href="#">HasTech</a>
                              </p>
                              <p className="short-desc">It's no secret, engines and transmissions can be very expensive...</p>
                              <a href="blog-post-left-sidebar.html" className="blog-post-link">
                                Read More
                              </a>
                            </div>
                          </div>
                          {/*=======  End of single slider post  =======*/}
                        </div>
                        <div className="col">
                          {/*=======  single slider post  =======*/}
                          <div className="single-slider-post">
                            <div className="single-slider-post__image">
                              <a href="blog-post-left-sidebar.html">
                                <img width={370} height={235} src="assets/img/blog/slider/5-370x235.webp" className="img-fluid" alt="" />
                              </a>
                              <div className="single-slider-post__date-sticker">
                                <span className="month">Oct</span>
                                <span className="day">06</span>
                              </div>
                            </div>
                            <div className="single-slider-post__content">
                              <h3 className="title">
                                <a href="blog-post-left-sidebar.html">The Life Cycle of Decor Items</a>
                              </h3>
                              <p className="post-meta">
                                by <a href="#">HasTech</a>
                              </p>
                              <p className="short-desc">It's no secret, engines and transmissions can be very expensive...</p>
                              <a href="blog-post-left-sidebar.html" className="blog-post-link">
                                Read More
                              </a>
                            </div>
                          </div>
                          {/*=======  End of single slider post  =======*/}
                        </div>
                      </div>
                    </div>
                    {/*=======  End of blog post slider wrapper  =======*/}
                  </div>
                </div>
              </div>
              {/*=======  End of blog post slider border wrapper  =======*/}
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
            Subscribe to our newsletters now and stay up to date with new
            collections, the latest lookbooks and exclusive offers.
          </p>
          <div className="newsletter-form">
            <form id="mc-form" className="mc-form">
              <input
                type="email"
                placeholder="Enter Your Email Address Here..."
                required=""
              />
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

export default Home;
