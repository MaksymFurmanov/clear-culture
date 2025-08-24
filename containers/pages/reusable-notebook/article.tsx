import Image from "next/image";

export default function Article() {
  return (
    <article>
      <div>
        <Image className={"w-full mx-auto max-w-250 md:rounded"}
               src={"/img/reusable-notebook/notebook-2.jpg"}
               alt={"reusable-reusable-notebook"}
               width={500}
               height={300}
        />
        <div className={"text-center my-10 mx-6"}>
          <p className={"mb-6"}>
            Experience the feel of real paper with our innovative reusable digital notebook.
          </p>
          <p>
            Write anytime, anywhere, and enjoy the tactile sensation of traditional writing without the waste.
          </p>
        </div>
      </div>

      <div>
        <div className={"flex"}>
          <Image className={"w-1/2 md:rounded-l"}
                 src={"/img/reusable-notebook/notebook-3.jpg"}
                 alt={"reusable-reusable-notebook"}
                 width={250}
                 height={300}
          />
          <Image className={"w-1/2 md:rounded-r"}
                 src={"/img/reusable-notebook/notebook-4.jpg"}
                 alt={"reusable-reusable-notebook"}
                 width={250}
                 height={300}
          />
        </div>
        <div className={"text-center my-10 mx-6"}>
          <p className={"mb-6"}>
            Write in your digital notebook anytime, and effortlessly sync your notes with any device.
          </p>
          <p>
            Our seamless synchronization feature keeps you organized and connected, no matter where you are.
          </p>
        </div>
      </div>
    </article>
  );
}