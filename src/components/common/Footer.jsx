// De Footer is de onderkant van de website met wat extra informatie.
const Footer = () => {
    return (
        <footer style={{
            padding: '40px 20px',
            marginTop: '80px',
            borderTop: '2px solid #333',
            background: '#1a1a1a',
            textAlign: 'center'
        }}>
            <p className="normaaltekst" style={{ fontSize: '0.8rem', opacity: 0.5, maxWidth: '600px', margin: '0 auto' }}>
                Finance Dashboard Tim de Rijck/Data van CoinGecko.
            </p>
            
        </footer>
    )
}

export default Footer;
