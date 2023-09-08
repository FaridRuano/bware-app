import Link from "next/link";

export default function bWare() {
  return (
    <>
      <div className="warp-center">
        <div>
          <Link href="/login">
            <button  className="btn btn-md">
              Bienvenido
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
