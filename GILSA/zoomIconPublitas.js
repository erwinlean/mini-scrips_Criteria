let icon;
let currentURL;

function observeDOMChanges() {
    const observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const elements = document.querySelectorAll('[id^="hotspot-"]');
                        const tooltips = node.querySelectorAll('.hotspot-tooltip');

                        tooltips.forEach(function (tooltip) {
                            let isHovered = false;

                            elements.forEach(function (element) {
                                let icon = element.querySelector('.hotspot-icon.product.with-icon');

                                currentURL = window.location.href;
                                if (currentURL.endsWith("/32") || currentURL.endsWith("/33")) {
                                    icon.style.transform = "scale(0.7)";
                                } else {
                                    icon.style.transform = "scale(1)";
                                };

                                element.addEventListener("mouseover", function () {
                                    if (!isHovered) {
                                        const span = tooltip.querySelector('span');
                                        icon = element.querySelector('.hotspot-icon.product.with-icon');

                                        if (span) {
                                            span.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                                            span.style.borderRadius = "5px";
                                        };

                                        if (currentURL.endsWith("/32") || currentURL.endsWith("/33")) {
                                            icon.style.transform = "scale(0.9)";
                                        } else {
                                            icon.style.transform = "scale(1.1)";
                                        };

                                        icon.style.transition = "transform 0.3s";
                                        isHovered = true;
                                    };
                                });

                                element.addEventListener("mouseout", function () {
                                    icon = element.querySelector('.hotspot-icon.product.with-icon');

                                    if (currentURL.endsWith("/32") || currentURL.endsWith("/33")) {
                                        icon.style.transform = "scale(0.7)";
                                    } else {
                                        icon.style.transform = "scale(1)";
                                    };

                                    icon.style.transition = "";
                                    isHovered = false;
                                });
                            });
                        });
                    };
                });
            };
        };
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
};

observeDOMChanges();