import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="dx-footer">
      <div className="dx-footer-inner">
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>DxPilot</span>
        <div className="dx-footer-links">
          {['Features', 'Pricing', 'Dashboard', 'Privacy'].map(l => (
            <a key={l} href="#" className="dx-footer-link">{l}</a>
          ))}
        </div>
        <span className="dx-footer-copy">© 2025 DxPilot</span>
      </div>
    </footer>
  )
}
