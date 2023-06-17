import { BsFillArrowLeftCircleFill } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="sidebar-footer pt-73 pe-30">
      <div className="footer-card">
        <div className="d-flex justify-content-between mb-20">
          <p className="fw-medium color-palette-1">
            Top Up &
            <br />
            Be The Winner
          </p>
        </div>
        <BsFillArrowLeftCircleFill width={60} height={60} />
      </div>
    </div>
  );
}
