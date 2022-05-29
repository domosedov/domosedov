export async function getStaticProps() {
  return {
    props: {
      foo: 'bar',
    },
  }
}

export default function Test() {
  return <div>Hi</div>
}
