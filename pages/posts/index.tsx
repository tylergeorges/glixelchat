import { useRouter } from "next/router";
import { PostsFolder } from "../../src/components/PostsFolder";
import { useEffect } from "react";

export default function PostsPage(props) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);
  return (
    <>
      <PostsFolder />
    </>
  );
}


export function getStaticProps(context){
    console.log("context: ",context)

        return{
            props: { z_index: 10, program_id: 0},
        }
}

// export function getStaticPaths(){
//     return{
//         params: {},
//     }
// }