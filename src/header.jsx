function Header() {
    return (
        <div style={{
            padding: '15px 30px',
            borderBottom: '2px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#1a1a1a',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src="src/assets/img/stocks.png" style={{ height: '30px' }} alt="Logo" />
                <h1 className="koptekst" style={{ fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>
                    FINANCE <span style={{ color: '#837aff' }}>DASHBOARD</span>
                </h1>
            </div>
            <div className="normaaltekst" style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
                <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>MARKETS</span>
                <span style={{ cursor: 'pointer', opacity: 0.6 }}>IMPACT</span>
                <span style={{ cursor: 'pointer', opacity: 0.6 }}>NEWS</span>
            </div>
        </div>
    )
}

export default Header