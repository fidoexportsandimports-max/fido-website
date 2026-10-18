import Image from "next/image";
import Link from "next/link";
import { formatDate, readMinutes, type Post } from "@/lib/blog";
import { photos } from "@/lib/photos";

export default function BlogCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_22px_44px_-22px_rgba(10,29,55,0.4)] ${large ? "flex-col lg:flex-row" : "flex-col"}`}
    >
      <div className={`relative overflow-hidden bg-mint ${large ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"}`}>
        <Image
          src={photos[post.image]}
          alt=""
          fill
          placeholder="blur"
          sizes={large ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-inksoft">{post.category}</span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${large ? "lg:justify-center lg:p-10" : ""}`}>
        <p className="text-[13px] text-muted">{formatDate(post.date)} · {readMinutes(post)} min read</p>
        <h3 className={`mt-2 tracking-tight group-hover:text-brand ${large ? "text-3xl md:text-4xl" : "text-xl"}`}>{post.title}</h3>
        <p className={`mt-3 leading-relaxed text-muted ${large ? "text-lg" : "text-[15px]"}`}>{post.excerpt}</p>
        <span className="tlink mt-auto pt-5">Read article <span className="arrow">→</span></span>
      </div>
    </Link>
  );
}
