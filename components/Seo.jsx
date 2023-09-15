import Head from "next/head";

const Seo = ({ pageTitle }) => {
  return (
    <>
      <Head>
        <title>
          {pageTitle &&
            `${pageTitle} || Arihant Jain`}
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
    </>
  );
};

export default Seo;
