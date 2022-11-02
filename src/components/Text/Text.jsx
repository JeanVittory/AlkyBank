import React from "react";

const textVariant = /** @type {const} */ ({
  lead: "lead",
  standard: "standard",
});

/**
 *Text for the paragraph element and others
 *@param {Object} props
 *@param {keyof JSX.IntrinsicElements} [props.as] - Heading tag to display
 *@param {React.ReactNode} [props.children]
 *@param {typeof textVariant[keyof typeof textVariant]} [props.variant= "standard"]
 *@param {string} [props.className]
 */
export const Text = ({
  as: Tag = "div",
  className = "",
  variant = textVariant.standard,
  children,
  ...props
}) => {
  return (
    <Tag
      {...props}
      className={`${className} ${
        variant === textVariant.standard
          ? "text-lg leading-[30px] font-normal"
          : variant === textVariant.lead
          ? "text-2xl leading-[30px] font-normal font-roboto"
          : ""
      } tracking-[0] decoration-[none] font-bold`}
    >
      {children}
    </Tag>
  );
};
