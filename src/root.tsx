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
				<Title>SolidStart Infinite Scroll Island</Title>
				<Meta name='description' content='Infinite Scroll Island Example' />
				<Meta charset='utf-8' />
				<Meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Body class='font-sans-serif bg-slate-950'>
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
