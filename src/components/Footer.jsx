export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.inner}>
                <p style={styles.desc}>
                    Register for exciting competitions, showcase your skills, and compete for glory in our upcoming events.
                </p>
                <ul style={styles.links}>
                    {[
                        { href: '/support', label: 'Contact' },
                        { href: '/terms', label: 'Terms & Conditions' },
                        { href: '/privacy', label: 'Privacy Policy' },
                        { href: '/cancellation-refund', label: 'Cancellation & Refund Policy' },
                    ].map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} style={styles.link}>{label}</a>
                        </li>
                    ))}
                </ul>
                <span style={styles.copy}>© 2024–2025. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 1rem',
        position: 'relative',
        zIndex: 1,
    },
    inner: {
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
    },
    desc: {
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: '1rem',
    },
    links: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 1rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.25rem 1.25rem',
    },
    link: {
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.55)',
        textDecoration: 'none',
    },
    copy: {
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.25)',
    },
};
