import { Footer } from 'src/components/Footer';
import { Navbar } from 'src/components/Nav';
import styles from './Layout.module.css';
import { useComponentVisible } from 'src/hooks/useComponentVisible';

const Layout = ({ children }) => {
	const { ref, isVisible, setIsVisible } = useComponentVisible(false);
	return (
		<div
			className={`${styles.page_container} relative grid min-h-screen grid-rows-[auto_1fr_auto] bg-white/90`}
			ref={ref}
		>
			<Navbar isVisible={isVisible} setIsVisible={setIsVisible} />

			<div className="contents">{children}</div>

			<Footer />
		</div>
	);
};

export { Layout };
