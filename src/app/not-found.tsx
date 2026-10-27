import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center pt-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent-2">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
          This page is <span className="font-serif font-normal italic">still in the lab.</span>
        </h1>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
