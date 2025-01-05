import './styles.css'

function Footer() {
    return (
        <footer>
            <div className="dsmeta-logo-container">
                <p className="footer-text">
                    <a href="https://www.linkedin.com/in/biellms/" target="_blank">Desenvolvido por  © Gabriel Mendes</a>
                </p>
                <div className='dsmeta-footer-link'>
                    <a href="https://www.linkedin.com/in/gabriel-mendes-0706ab1b8" target="_blank">
                        <img src="https://img.shields.io/badge/-Linkedin-blue" className="linkedin-icon" />
                    </a>
                    <a href="https://github.com/Biellms" target="_blank">
                        <img src="https://img.shields.io/badge/-Github-gray" className="github-icon" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer