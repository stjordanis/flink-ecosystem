import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import { format } from "date-fns";
import useScroll from "client/helpers/useScroll";
import Votes from "client/components/Votes";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
  width: 100%;
`;

export default function PackageList(props: Props) {
  useScroll(props.page);

  // Typescript can't return an array with out wrapping it in a fragment. :(
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356#issuecomment-336384210
  return (
    <>
      {props.packages.map(pkg => (
        <div className="row mb-3" key={pkg.slug}>
          <div className="col-4 overflow-hidden d-flex align-items-center justify-content-center">
            <Link to={`/packages/${pkg.slug}`}>
              <Img src="https://lorempixel.com/640/480/city/" alt="something" />
            </Link>
          </div>
          <div className="col-8">
            <h5 className="card-title">
              <Link to={`/packages/${pkg.slug}`}>{pkg.name}</Link>
            </h5>
            <div className="card-text">{pkg.description}</div>
            <div className="card-text mt-2 d-flex justify-content-between">
              <span>
                <Votes
                  id={pkg.id}
                  vote={pkg.vote}
                  slug={pkg.slug}
                  upvotes={pkg.upvotes}
                  downvotes={pkg.downvotes}
                />
                <Link to={`/packages/${pkg.slug}`}>
                  <small className="text-muted">
                    <i className="fal fa-comments mr-1" title="Comments" />
                    {pkg.comments}
                  </small>
                </Link>
              </span>

              <small>Last Updated: {format(pkg.updated, "MM/DD/YYYY")}</small>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export type Package = {
  category: string;
  comments: number;
  description: string;
  downvotes: number;
  id: number;
  license: string;
  name: string;
  readme: string;
  repository: string;
  slug: string;
  tags: string;
  updated: string;
  upvotes: number;
  vote: number;
  website: string;
};

type Props = {
  packages: Array<Package>;
  page: number;
};
