import './scss/style.scss';

let burgerBtn = document.querySelector('.burger-btn');
let menuToggle = document.getElementById('menu-toggle');
let burgerMenu = document.querySelector('.header_nav');
let body = document.querySelector('body');
let blackout = document.querySelector('.blackout');
let popup = document.querySelector('.popup');
let item = document.querySelector('.item');
let cross = document.querySelector('.cross');


burgerBtn.addEventListener('click', openBurger);
item.addEventListener('click', openPopup);
blackout.addEventListener('click', closePopup);
cross.addEventListener('click', closePopup);

function openBurger() {
    burgerMenu.classList.toggle('show');
    body.classList.toggle('fixed-page');
}

function openPopup() {
    popup.classList.toggle('open');
    body.classList.toggle('fixed-page');
}

function closePopup() {
    popup.classList.remove('open');
    body.classList.remove('fixed-page');
}

let $tabs = function (target) {
    let
        _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
        _eventTabsShow,
        _showTab = function (tabsLinkTarget) {
            let tabsBodyTarget, tabsLinkActive, tabsBodyShow;
            tabsBodyTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
            tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.active');
            tabsBodyShow = tabsBodyTarget.parentElement.querySelector('.show');
            if (tabsLinkTarget === tabsLinkActive) {
                return;
            }
            if (tabsLinkActive !== null) {
                tabsLinkActive.classList.remove('active');
            }
            if (tabsBodyShow !== null) {
                tabsBodyShow.classList.remove('show');
            }
            tabsLinkTarget.classList.add('active');
            tabsBodyTarget.classList.add('show');
            document.dispatchEvent(_eventTabsShow);
        },
        _switchTabTo = function (tabsLinkIndex) {
            let tabsLinks = _elemTabs.querySelectorAll('.tab__links');
            if (tabsLinks.length > 0) {
                if (tabsLinkIndex > tabsLinks.length) {
                    tabsLinkIndex = tabsLinks.length;
                } else if (tabsLinkIndex < 1) {
                    tabsLinkIndex = 1;
                }
                _showTab(tabsLinks[tabsLinkIndex - 1]);
            }
        };

    _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

    _elemTabs.addEventListener('click', function (e) {
        let tabsLinkTarget = e.target;
        if (!tabsLinkTarget.classList.contains('tab__links')) {
            return;
        }
        e.preventDefault();
        _showTab(tabsLinkTarget);
    });

    return {
        showTab: function (target) {
            _showTab(target);
        },
        switchTabTo: function (index) {
            _switchTabTo(index);
        }
    }

};

$tabs('.tab');