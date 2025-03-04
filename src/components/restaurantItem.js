const restaurantItem = (props) => {
    const {title, subtitle, description} = props

    return `
    <div class="restaurant__info">
      ${text({ tag: "h3", size: "large", children: title })}
      ${text({
        tag: "span",
        size: "medium",
        color: "orange",
        children: subtitle,
      })}
      ${text({tag: "p" size: "medium", children: "4.6"})}
      <p class="restaurant__description text-body">
      ${description}
      </p>
      </div>
    `
};

export default restaurantItem;
