import Image from "next/image";

export default function IntegratesWith() {
  return (
    <section className={"mb-10"}>
      <h2 className={"text-2xl text-center mb-8"}>
        Integrates with
      </h2>

      <div className={"flex justify-evenly"}>
        <div className={"flex flex-col gap-4 justify-end items-center w-1/4"}>
          <Image src={"/img/reusable-notebook/google-drive.svg"}
                 alt={"Google Drive"}
                 width={100}
                 height={100}
          />
          <p>
            Google Drive
          </p>
        </div>
        <div className={"flex flex-col gap-4 justify-end items-center w-1/4"}>
          <Image src={"/img/reusable-notebook/one-drive.svg"}
                 alt={"OneDrive"}
                 width={100}
                 height={100}
          />
          <p>
            OneDrive
          </p>
        </div>
        <div className={"flex flex-col gap-4 justify-end items-center w-1/4"}>
          <Image src={"/img/reusable-notebook/dropbox.svg"}
                 alt={"Dropbox"}
                 width={100}
                 height={100}
          />
          <p>
            Dropbox
          </p>
        </div>
      </div>
    </section>
  );
}