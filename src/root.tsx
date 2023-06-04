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
				<Title>SolidStart Infinite scroll Island</Title>
				<Meta name='description' content='Infinite scroll Island example' />
				<Meta charset='utf-8' />
				<Meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Body class='font-serif bg-slate-950'>
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
