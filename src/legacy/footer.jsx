function Footer() {
    return (
        <div style={{
            padding: '40px 20px',
            marginTop: '80px',
            borderTop: '2px solid #333',
            background: '#1a1a1a',
            textAlign: 'center'
        }}>
            <p className="normaaltekst" style={{ fontSize: '0.8rem', opacity: 0.5, maxWidth: '600px', margin: '0 auto' }}>
                Crypto Intelligence. Data from CoinGecko. Educational purposes only.
            </p>
            <p className="normaaltekst" style={{ fontSize: '0.7rem', marginTop: '20px', opacity: 0.3 }}>
                &copy; 2026 FINANCE DASHBOARD
            </p>
        </div>
    )
}

export default Footer