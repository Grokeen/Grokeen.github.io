
import "../App.css";

import React, { useState} from 'react';

import { Link } from "react-router-dom";




function App() {
	const [inBasket, setInBasket] = useState(false);
	const documentNone = () => {
		setInBasket(true);
	};
	const documentBlock = () => {
		setInBasket(false);
	};






	const fnCartBtn = (productId, operationType, conditionFlag, moneyValue , itemTitle) => {
		if (operationType === 'NORMAL' && conditionFlag === 'N') {
			addToCart(productId, moneyValue,itemTitle);
		}
	}
	const addToCart = (productId, moneyValue,itemTitle) => {
		const productCart = { Id: productId, price: moneyValue ,name:itemTitle};
		sessionStorage.setItem(productId+'inBasket', JSON.stringify(productCart));


		documentNone();
	}
	


	function importAll(r) {
		let images = {};
		r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
		return images;
	}
	const imagesJPGALL = importAll(require.context('../pic', false, /\.jpg$/));
	

	function restartTimer(){
		sessionStorage.clear();
	}


	return (

		<div className="wrap">
			{/* 테스트용 */}
			{/* <div> 	
				<button onClick={restartTimer}>세션 지우기</button><br/>			
			</div> */}
			<section className="mainBest">
				<div className="inner">
					<div className="tabCont tabON">
						<ol className="itemList" id="HIGH_SALE">

							<li>

								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['1ad.jpg']} alt="imFile1" />
									</div>


									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">진한 사골곰탕 300g</strong>
										<p className="txt">100% 사골로 고은 진한 사골곰탕</p>
										<div className="txtPrice">
											<span className="cost1" title="할인가"><b>1,590</b>원</span>
											<del className="cost2" title="판매가"><b>1,750</b>원</del>
											<em className="rate" title="할인율"><b>10</b>%</em>
										</div>
										<div className="txtOption">
											<span className="option temp3">실온</span>
										</div>
									</div>
								</Link>

								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('1ad', 'NORMAL', 'N', '1,950', '진한 사골곰탕 300g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>

								</div>
							</li>



							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['2ad.jpg']} alt="imFile2" />
									</div>


								
									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 전주식 소고기 오색비빔밥 310g</strong>
										<p className="txt">오색 가득 토핑 듬뿍, 소고기, 한국의 맛</p>
										<div className="txtPrice">
											<span className="cost1" title="판매가"><b>5,980</b>원</span>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>

								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('2ad', 'NORMAL', 'N', '5,980','[온더고] 전주식 소고기 오색비빔밥 310g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>


							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['3ad.jpg']} alt="imFile3" />
									</div>

									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 더블치즈 차돌깍두기 300g</strong>
										<p className="txt">치즈 듬뿍,모짜렐라, 통차돌, 국내산 깍두기</p>
										<div className="txtPrice">
											<span className="cost1" title="할인가"><b>5,680</b>원</span>
											<del className="cost2" title="판매가"><b>5,980</b>원</del>
											<em className="rate" title="할인율"><b>5</b>%</em>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>

								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('3ad', 'NORMAL', 'N', '5,680','[온더고] 더블치즈 차돌깍두기 300g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>
							

							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['4ad.jpg']} alt="imFile4" />
									</div>


									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 숯불향 우삼겹불고기덮밥 290g</strong>
										<p className="txt">저온 숙성 불고기, 오븐 구이 야채, 한국의 맛</p>
										<div className="txtPrice">
											<span className="cost1" title="판매가"><b>5,980</b>원</span>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>
								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('4ad', 'NORMAL', 'N', '5,980','[온더고] 숯불향 우삼겹불고기덮밥 290g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>

							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>
									<div className="thum">
										<img src={imagesJPGALL['5ad.jpg']} alt="imFile5" />
									</div>


									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 이탈리아식 페퍼라구 볼로네제 파스타 300g</strong>
										<p className="txt">매콤달콤, 고기 듬뿍, 라구 소스, 펜네파스타</p>
										<div className="txtPrice">
											<span className="cost1" title="판매가"><b>5,980</b>원</span>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>

								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('5ad', 'NORMAL', 'N', '5,980','[온더고] 이탈리아식 페퍼라구 볼로네제 파스타 300g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>


							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['6ad.jpg']} alt="imFile6" />
									</div>


									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 육즙 가득 미니함박 &amp; 로제파스타 310g</strong>
										<p className="txt">육즙 가득 함박, 토마토 로제, 파스타</p>
										<div className="txtPrice">
											<span className="cost1" title="판매가"><b>5,980</b>원</span>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>

								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('6ad', 'NORMAL', 'N', '5,980','[온더고] 육즙 가득 미니함박 로제파스타 310g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>


							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['7ad.jpg']} alt="imFile7" />
									</div>

									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 통모짜 로제 떡볶이 with 파스타 320g</strong>
										<p className="txt">치즈 듬뿍, 떡볶이, 로제 소스, 생크림, 퓨전한식</p>
										<div className="txtPrice">
											<span className="cost1" title="판매가"><b>5,980</b>원</span>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>
								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('7ad', 'NORMAL', 'N', '5,980','[온더고] 통모짜 로제 떡볶이 with 파스타 320g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>


							<li>
								<Link to="/" className="iLink" style={{ textDecoration: 'none' }}>

									<div className="thum">
										<img src={imagesJPGALL['8ad.jpg']} alt="imFile8" />
									</div>

									<div className="cont">
										<div className="txtFlag">
										</div>
										<strong className="tit">[온더고] 중화식 첨면장 불향 덮밥 290g</strong>
										<p className="txt">첨면장, 짜장, 계란 후라이, 고추 잡채, 중화식</p>
										<div className="txtPrice">
											<span className="cost1" title="판매가"><b>6,480</b>원</span>
										</div>
										<div className="txtOption">
											<span className="option temp1">냉동</span>
										</div>
									</div>
								</Link>
								<div className="iHover">
									<button type="button" className="cart" onClick={() => fnCartBtn('8ad', 'NORMAL', 'N', '6,480','[온더고] 중화식 첨면장 불향 덮밥 290g')}>장바구니</button>
									<button type="button" className="favor">쇼핑찜</button>
									<button type="button" className="compare">상품비교</button>
								</div>
							</li>

						</ol>
					</div>
				</div>

				<div id="basketScreen" style={{ display: inBasket ? 'block' : 'none' }} >

					<div id="L1" className="layerPop" >
						<div className="layTop">
							<h3 className="laytit">장바구니</h3>
							<button type="button" className="close" onClick={(documentBlock)}>닫기</button>
						</div>
						<div className="layCon">
							<div className="txtAlert">
								<p className="txt1">선택한 상품이 장바구니에 담겼습니다.</p>
								<p className="txt2">장바구니로 이동 하겠습니까?</p>
							</div>
							<div className="btnArea">

								<Link to={"/barsketPage"} className="btnST btnM other" style={{ textDecoration: 'none' }}>장바구니 확인하기</Link>
								<a href="/" className="btnST btnM action" style={{ textDecoration: 'none' }}>계속 쇼핑하기</a>
							</div>
						</div>
					</div>
					<div className="dimmed" style={{ display: 'block' }}>
					</div>

				</div>

			</section>
		</div>
		
	);
}

export default App;
