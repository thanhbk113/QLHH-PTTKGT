import "./intro.scss";

const Intro = () => {
  return (
    <div className="intro">
      <div className="left">
        <h1>Smart Watches</h1>
        <h4>
          Đồng hồ Apple Watch là sản phẩm nổi tiếng ở trên thế giới và rất được
          yêu thích ở Việt Nam. Nếu bạn cũng đang muốn tìm hiểu về và mua cho
          mình một chiếc Smartwatch chất lượng đến từ thương hiệu nổi tiếng
          Apple, đừng bỏ qua trang web của chúng tôi bởi vì tất cả những gì bạn
          cần ở đây.
        </h4>
        <button>Xem sản phẩm</button>
      </div>
      <div className="right">
        <img
          src="https://html.design/demo/timups/images/slider-img.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Intro;
