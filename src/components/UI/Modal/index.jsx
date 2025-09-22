import "./Modal.css";

export default function Modal({ className="", isOpen, setIsOpen, children }) {
  return (
    <div className={"modal " + className} onClick={() => {setIsOpen(false)}} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>&times;</button>
        {children}
      </div>
    </div>
  );
}