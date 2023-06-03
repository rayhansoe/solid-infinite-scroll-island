// @refresh reload
import { Suspense } from "solid-js";
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
	Link,
} from "solid-start";
import "./root.css";

export default function Root() {
	return (
		<Html lang='en' class='dark'>
			<Head>
				<Title>SolidStart - With TailwindCSS</Title>
				<Meta charset='utf-8' />
				<Meta name='viewport' content='width=device-width, initial-scale=1' />
				<Link rel='preconnect' href='https://fonts.googleapis.com' />
				<Link rel='preconnect' href='https://fonts.gstatic.com' crossorigin='' />
				<Link
					href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<Body class='font-inter bg-slate-950'>
				<Suspense>
					<ErrorBoundary>
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
