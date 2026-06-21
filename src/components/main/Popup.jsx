import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "../scss/Popup.scss"

export default function Popup({ id, imageUrl, link }) {
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    useEffect(() => {
        const now = new Date().getTime();

        const isHidden = (key) => {
            const raw = localStorage.getItem(key);
            const until = raw ? parseInt(raw, 10) : NaN;
            return Number.isFinite(until) && now <= until;
        };

        const hidden1 = isHidden('popup_hidden_shipping');
        const hidden2 = isHidden('popup_hidden_membership');

        if (hidden1 && hidden2) return; // 둘 다 숨김이면 아무것도 안 띄움

        // 랜덤 순서로 하나 선택
        const showFirst = Math.random() < 0.5 ? 'shipping' : 'membership';

        if (showFirst === 'shipping') {
            if (!hidden1) setShowPopup1(true);
            else setShowPopup2(true); // shipping 숨김이면 membership으로
        } else {
            if (!hidden2) setShowPopup2(true);
            else setShowPopup1(true); // membership 숨김이면 shipping으로
        }
    }, []);

    const hideToday = (id) => {
        const midnight = new Date().setHours(23, 59, 59, 999);
        localStorage.setItem(`popup_hidden_${id}`, midnight.toString());
        if (id === 'shipping') setShowPopup1(false);
        if (id === 'membership') setShowPopup2(false);
    };

    if (!showPopup1 && !showPopup2) return null;

    return (
        <div className="main-popup-overlay">
            <div className="popup-flex-container">

                {showPopup1 && (
                    <div className="main-popup-content">
                        <Link className="popup-link-area">
                            <div className="popup-body">
                                <img src="/images/main/popup_bg_01.png" alt="무료배송" />
                                <div className="popup-text type-shipping">
                                    <div className="title">
                                        <p>부담없는</p>
                                        <p>온라인쇼핑</p>
                                    </div>
                                    <div className="desc">
                                        <p>5만원이상 구매시</p>
                                        <p>무료 배송 서비스</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="popup-footer">
                            <button onClick={() => hideToday('shipping')}>오늘 하루 열지않기</button>
                            <span className="divider">|</span>
                            <button onClick={() => setShowPopup1(false)} className="close-btn">
                                <img src="/images/icon/close.svg" alt="닫기" />
                            </button>
                        </div>
                    </div>
                )}

                {showPopup2 && (
                    <div className="main-popup-content">
                        <Link to="/login" className="popup-link-area">
                            <div className="popup-body">
                                <img src="/images/main/popup_bg_02.png" alt="멤버십혜택" />
                                <div className="popup-text type-membership">
                                    <p className="greet">만나서 반가워요!</p>
                                    <div className="title">
                                        <p>지금 시작하고</p>
                                        <p>10% OFF</p>
                                    </div>
                                    <p className="info">멤버십 전용 혜택 정보도 보내드려요.</p>
                                    <p className="go-btn">혜택 받고 시작하기 <span>&gt;</span></p>
                                </div>
                            </div>
                        </Link>
                        <div className="popup-footer">
                            <button onClick={() => hideToday('membership')}>오늘 하루 열지않기</button>
                            <span className="divider">|</span>
                            <button onClick={() => setShowPopup2(false)} className="close-btn">
                                <img src="/images/icon/close.svg" alt="닫기" />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}