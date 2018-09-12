module.exports = Tab;

function Tab () {
  this.$activeTab = null;
  this.$activeTabContent = null;
  this.$tabsContainer = document.querySelector('.tabs');
  this.$tabsControllers = Array.from(document.querySelectorAll('.tab-el'));
  let self = this;
  this.$tabsContainer.addEventListener('click', function(ev) {
    self.showTabContent(ev, self);
  });
  this.showDefaultTab();
}

Tab.prototype.init = function(ev) {
  this.showTabContent();
}

Tab.prototype.showTabContent = function(ev, tabObj) {
  if(!ev.target.classList.contains('tab-el') || ev.target === tabObj.$activeTab) {
    return
  }

  delete tabObj.$activeTab.dataset.tab;
  tabObj.$activeTabContent.style = 'display: none';
  tabObj.$activeTab = ev.target;
  tabObj.$activeTab.dataset.tab = "selected";
  tabObj.$activeTabContent = document.querySelector(`*[data-tab-content = ${tabObj.$activeTab.dataset.tabName}]`);
  this.$activeTabContent.style = "display: block";
}

Tab.prototype.showDefaultTab = function (ev) {
  this.$activeTab = document.querySelector('*[data-tab="selected"]');
  if(!this.$activeTab) {
    return
  }
  this.$activeTabContent = document.querySelector(`*[data-tab-content = ${this.$activeTab.dataset.tabName}]`);
  this.$activeTabContent.style = "display: block";
}
