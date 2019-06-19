import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <header>Header</header>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
        <footer>Footer!!!!!</footer>
      </Html>
    );
  }
}

export default MyDocument;
