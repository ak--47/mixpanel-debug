// ? https://github.com/mixpanel/analytics/blob/3fc88abf4a0b1e5c818233bbb6a616e62e105621/iron/design-system/src/index.js#L197
import {FetchServer} from 'domsuite';
import {Component} from 'panel';
import range from 'lodash/range';

import {XAxisUnit} from 'common/charts/visualization/line-chart/enums';
import {TEXT_HIGHLIGHT_THEME} from 'common/components/text-highlight';
import {ToastType} from 'common/components/toast/types';
import {addToast, closeToast} from 'common/components/toast-area/toast-manager';
import {ChartType, PRIMITIVE_MATH_TYPES, ValueRepresentationType} from 'common/report/constants';
import {DashboardSelectorController} from 'common/report/controllers/dashboard-selector-controller';
import {forceProjectId} from 'common/report/util';
import COLORS from 'common/stylesheets/mixins/colors.json';
import {filterAttributes} from 'common/util';
import {defineAndMakeJsxFactory} from 'common/util/jsx';
import {DateRange} from 'common/widgets/date-range-picker/models/date-range';
import {TimeUnit} from 'common/widgets/date-range-picker/models/types';

import tooltipImageUrl from '../assets/tooltip-image.svg';
import {mockDashboardsClient} from './clients/mock-dashboards-client';
import {API_HANDLERS, EVENT_NAMES} from './fixtures/api-handlers';
import {barVizData, stackedBarVizData} from './fixtures/bar-chart';
import bookmarks from './fixtures/bookmark-data.json';
import {chartTooltipSections} from './fixtures/chart-tooltip-data';
import events from './fixtures/custom-event-modal-data.json';
import {
  itemsMenuSections,
  sectionsWithCustomRenderers,
  sectionsWithHoverActionRenderers,
  withReadOnlyItemMenuSections,
} from './fixtures/items-menu-sections';
import {
  selectAnimalOptions,
  selectIconSections,
  selectRangeOptions,
  selectRoleSections,
  selectSubSections,
} from './fixtures/select-sections';
import {carTableRows} from './fixtures/car-table-rows';
import {checkboxListAnimalItems, checkboxListCityItems} from './fixtures/checkbox-list-items';
import {emojiTableRows} from './fixtures/table-emoji-list';
import {buttonOptions, cohortDetails} from './fixtures/popover-card-button-options';
import {funnelsChartSteps} from './fixtures/funnels-chart-steps';
import {customData, timeData} from './fixtures/line-chart';
import {sankeyChartData} from './fixtures/sankey-chart-data';
import {sidenavSections} from './fixtures/sidenav-sections';
import {template} from './templates/index';
import './index.styl';
import './components/nav-col';
import './components/auto-doc';
import './components/code-tip';
import {getIconSets} from './icon-sets';

const PROJECT_ID = 3;

// Override the getProjectId() url helper which use the URL to parse projectId
forceProjectId(PROJECT_ID);

export class DesignSystem extends Component {
  constructor() {
    super();
    this.elRefs = {};

    const fetchServer = new FetchServer(API_HANDLERS);
    fetchServer.start();
  }

  get config() {
    return {
      template,
      defaultState: {
        COLORS,
        blueToggleValue: `option1`,
        buttonOptionValue: ``,
        bookmarks,
        calendar: {dateRange: new DateRange()},
        clickableInputValue: `This is valid`,
        clickableInputValueTel: `1234567890`,
        customEvent: events.find((ev) => ev.custom),
        dashboardController: new DashboardSelectorController({
          projectId: PROJECT_ID,
          bookmarkID: 2415340,
          dashboardsClient: mockDashboardsClient,
        }),
        dataGroupID: 1,
        filename: ``,
        filterBarTableSelectedTab: `mine`,
        filterBarTableRows: carTableRows.filter((row) => row.owner === `You`),
        inputGroupSaving: false,
        navSections: [],
        open: {
          bookmarksWidget: false,
          bucketPane: false,
          caretMenu: false,
          cohortsQueryBuilder: false,
          confirm: false,
          confirmDelete: false,
          creatorNameDashboardSelector: false,
          dashboardMultiSelector: false,
          dashboardSelector: false,
          drawer: false,
          dropPaneMenu: false,
          initiallySortedDashboardSelector: false,
          menu: false,
          menuUp: false,
          modal: false,
          onlyEditableDashboardsSelector: false,
          popup: false,
          restrictCreatingDashboard: false,
          restrictedDashboardMultiSelector: false,
          singleSectionDashboardSelector: false,
          tagSelector: false,
        },
        queryBlockSelectedCohort: [],
        queryBlockSelectedEvent: {},
        queryBlockSelectedFilter: {},
        queryBlockSelectedProperty: {},
        queryBlockSelectedSegment: [],
        queryBlockSelectedTime: {},
        queryBuilderState: {
          events: [
            {
              filters: [],
              filtersOperator: `or`,
              event: {label: EVENT_NAMES.VIEWED_REPORT, value: EVENT_NAMES.VIEWED_REPORT},
              aggregationOperator: PRIMITIVE_MATH_TYPES.TOTAL,
            },
          ],
        },
        queryEntrySectionEntries: [],
        queryExclusionSectionEventEntries: [],
        queryMultiBlockSelectedFilters: [],
        savingBookmark: false,
        selectedBookmarkId: null,
        settingsEmail: ``,
        tagSelectorLoadState: `idle`,
        tagSelectorData: {
          options: [
            {label: `my dashboard`, icon: `profile`},
            {label: `Anomalies`},
            {label: `readonly selected`, isDisabled: true, isSelected: true},
            {label: `SEGMENTATION`, isSelected: true},
            {label: `readonly`, isDisabled: true},
            {label: `another tag`, isSelected: true},
            {label: `our tag`},
            {label: `his tag`, subLabel: `With a sublabel and icon`, icon: `analysis-rolling`},
          ],
          settingsLiTags: new Set([`readonly selected`, `another tag`, `SEGMENTATION`, `my dashboard`]),
        },

        // component attributes default state
        // NOTE: use component(Id?)Attribute camel case format and keep it a-z sorted
        chartTooltipSections,
        checkboxChecked: true,
        checkboxListShowMatchesItems: checkboxListCityItems,
        itemsMenuSearchFilter: ``,
        itemsMenuSections,
        selectIconSections,
        selectSubSections,
        selectIconSelectedOption: ``,
        selectAnimalOptions,
        selectAnimalSelectedOption: selectAnimalOptions[0],
        selectRangeOptions,
        selectRangeSelectedOption: `between`,
        selectRoleSections,
        selectRoleSelectedOption: ``,
        selectNestedSelectedOption: ``,
        sidenavWidth: 300,
        switchOn: false,
        tableRows: emojiTableRows,
        sectionsWithCustomRenderers,
        sectionsWithHoverActionRenderers,
        withReadOnlyItemMenuSections,
        stringToastPortalId: 0,
        HTMLToastPortalId: 0,
      },
      helpers: {
        ChartType,
        TimeUnit,
        ValueRepresentationType,
        XAxisUnit,
        barVizData,
        stackedBarVizData,
        toDashCase: (str) => (str ? str.toLowerCase().replace(/[^\w]+/g, `-`) : ``),
        contentInserted: (contentEl) => {
          const navSections = this.helpers.getNavSections(contentEl);
          // contentInserted is already called as part of existing update cycle
          // so we use requestAnimationFrame to update parsed TOC
          requestAnimationFrame(() => this.update({navSections}));
        },
        getFilterBarTableSelectConfigs: () => {
          return [
            {
              name: `make`,
              searchable: true,
              customFilters: {
                Chrysler: (row, val) => val === `Chrysler`,
                Lamborghini: (row, val) => val === `Lamborghini`,
                Nissan: (row, val) => val === `Nissan`,
              },
              options: [`All Makes`, `Chrysler`, `Lamborghini`, `Nissan`],
              defaultFilterLabel: `All Makes`,
            },
            {
              name: `year`,
              searchable: true,
              options: [`1993`, `2011`, `2020`],
            },
            {
              name: `months`,
              searchable: true,
              multiple: true,
              options: [`Jan`, `Feb`, `Mar`, `Apr`],
            },
          ];
        },
        getNavSections(contentEl) {
          return Array.from(contentEl.querySelectorAll(`section`)).map((el) => ({
            label: el.dataset.label,
            id: el.id,
            items: Array.from(el.querySelectorAll(`.sub-section`))
              .map((el) => ({
                label: el.dataset.label,
                id: el.id,
              }))
              .filter((item) => item.label),
          }));
        },
        filterAttributes,
        getIconSets,
        HighlightThemes: TEXT_HIGHLIGHT_THEME,
        blueToggleChanged: (ev) => this.update({blueToggleValue: ev.detail.selected}),
        buttonOptionChanged: (ev) => this.update({buttonOptionValue: ev.detail.value}),
        closeModal: (key) => {
          this.state.open[key] = false;
          this.update();
        },
        openModal: (key) => {
          this.state.open[key] = true;

          this.update();
        },
        handleMenuChange: (key, state) => {
          let openState = null;
          switch (state) {
            case `open`:
              openState = true;
              break;
            case `closed`:
              openState = false;
              break;
          }
          if (openState !== null) {
            this.update({open: Object.assign(this.state.open, {[key]: openState})});
          }
        },
        handleModalChange: (key, state) => {
          this.state.open[key] = state === `open`;
          this.update();
        },
        handleNamerSubmit: () => {
          this.update({inputGroupSaving: true});
          setTimeout(() => {
            this.update({inputGroupSaving: false});
            alert(`Saved!`);
          }, 2000);
        },
        toggleMenu: () => {
          this.state.open.menu = !this.state.open.menu;
          this.update();
        },
        toggleMenuUp: () => {
          this.state.open.menuUp = !this.state.open.menuUp;
          this.update();
        },
        toggleCaretMenu: () => {
          this.state.open.caretMenu = !this.state.open.caretMenu;
          this.update();
        },
        toggleDropPaneMenu: () => {
          this.state.open.dropPaneMenu = !this.state.open.dropPaneMenu;
          this.update();
        },
        handleClickableInputSave: (ev) => this.update({clickableInputValue: ev.detail.value}),
        handleClickableInputSaveTel: (ev) => this.update({clickableInputValueTel: ev.detail.value}),
        getCheckboxListItems: () => checkboxListAnimalItems,
        getPopoverButtonOptions: () => buttonOptions,
        getPopoverCohortDetails: () => cohortDetails,
        getFunnelsChartSteps: () => funnelsChartSteps,
        getSankeyChartData: () => sankeyChartData,
        handleCheckboxListShowMatchesClick: (ev) => {
          const {item} = ev.detail;
          const index = this.state.checkboxListShowMatchesItems.findIndex(({value}) => value === item.value);
          const cities = [...this.state.checkboxListShowMatchesItems];
          // Replace item in checkboxList with the one from event (which is already toggled) without modifying original
          cities.splice(index, 1, item);

          this.update({checkboxListShowMatchesItems: cities});
        },
        handleBookmarksMenuSubmit: (ev) => {
          switch (ev.detail.action) {
            case `select`:
              console.info(`Selected:`, ev.detail.value.id);
              break;
            case `delete`:
              this.update({bookmarks: this.state.bookmarks.filter((b) => b.id !== ev.detail.bookmarkId)});
              break;
            case `create`:
              this.update({savingBookmark: true});
              setTimeout(() => {
                console.info(`Created:`, ev.detail.name);
                const newBookmark = {
                  id: new Date().getTime(),
                  user_id: 1, // eslint-disable-line camelcase
                  name: ev.detail.name,
                  user: `John D.`,
                };
                this.state.bookmarks.push(newBookmark);
                this.update({savingBookmark: false, selectedBookmarkId: newBookmark.id});
              }, 2000);
          }
        },
        handleBookmarksMenuChange: (ev) => {
          if (ev.detail.open) {
            this.state.open.bookmarksWidget = ev.detail.open;
          }
          this.update();
        },

        handleFilterBarTableTabChange: (ev) => {
          const selectedTab = ev.detail.selectedTab;
          this.update({
            filterBarTableSelectedTab: selectedTab,
            filterBarTableRows: carTableRows.filter((row) => (selectedTab === `mine` ? row.owner === `You` : true)),
          });
        },

        handleDashboardSelectorSelect: () => {
          this.helpers.closeModal(`dashboardSelector`);
          this.helpers.closeModal(`restrictCreatingDashboard`);
        },
        handleDashboardSelectorMultiselect: () => {
          this.helpers.closeModal(`dashboardMultiSelector`);
          this.helpers.closeModal(`restrictedDashboardMultiSelector`);
        },

        toggleTagSelector: () => {
          this.state.open.tagSelector = !this.state.open.tagSelector;
          this.update();
        },
        handleTagSelectorDropMenuChange: (ev) => {
          this.state.open.tagSelector = ev.detail.state !== `closed`;
          this.update();
        },
        handleTagSelectorSave: (ev) => {
          this.state.tagSelectorData.saving = true;
          this.update();
          setTimeout(() => {
            // mock network request latency
            this.state.tagSelectorData.settingsLiTags = new Set([...ev.detail.tags]);
            this.state.tagSelectorData.saving = false;
            this.state.open.tagSelector = false;
            this.update();
          }, 2000);
        },
        handleTagSelectorChange: (ev) => {
          if (ev.detail && ev.detail.action) {
            const tag = ev.detail.tagName;
            if (ev.detail.action === `addTag`) {
              this.state.tagSelectorData.settingsLiTags.add(tag);
              if (!Array.from(this.state.tagSelectorData.options).filter((el) => el.label === tag)) {
                this.state.tagSelectorData.options.add({label: tag});
              }
              this.update();
            } else if (ev.detail.action === `removeTag`) {
              this.state.tagSelectorData.settingsLiTags.delete(tag);
              this.update();
            }
          }
        },
        handleTagSelectorSubmit: () => {
          this.state.open.tagSelector = false;
          this.update();
        },
        addToast: () => {
          addToast({
            message: `Hi, I'm toast ${new Date().getTime()}`,
            cta: `go to link`,
            undoable: true,
            hide: false,
            type: ToastType.INFO,
          });
        },
        closeToast: (toast) => {
          toast.closed = true;
          closeToast(toast);
        },
        getDateRangeAttributes: () => {
          const {dateRange} = this.state.calendar;
          return dateRange && dateRange.getAttributes();
        },
        updateDateRange: ({detail: {dateRange}}) => {
          this.update({calendar: {dateRange}});
        },
        email: () => this.state.settingsEmail,
        updateEmail: (email) => {
          this.update({settingsEmail: email});
          return true;
        },
        saveTags: (tags) => {
          this.state.tagSelectorData.settingsLiTags = tags;
          this.state.tagSelectorData.options = new Set([...tags, this.state.tagSelectorData.options]);
          return true;
        },

        handleTableSelectionChange: (ev) => {
          ev.detail.changed.forEach((c) => (c.row.isSelected = c.isSelected));
          this.update();
        },

        handleRowDetailsVisibilityChange: (ev) => {
          ev.detail.changed.forEach((c) => (c.row.isExpanded = c.isExpanded));
          this.update();
        },

        //#region context-panel
        populateTooltip: (ev) => {
          const item = ev.detail.item;
          const tooltipData = item.tooltipData || null;
          this.update({tooltipData});
        },
        //#endregion

        //#region Custom event modal
        getEvents: () => events,
        clickEditCustomEvent: () => {
          this.update({stagedCustomEvent: {id: this.state.customEvent.id}});
        },
        createNewCustomEvent: () => {
          this.update({stagedCustomEvent: {id: null}});
        },
        customEventsModalClosed: () => {
          this.update({stagedCustomEvent: null});
        },
        savedCustomEvent: (ev) => {
          const customEventParams = this.state.stagedCustomEvent.id ? this.state.customEvent : {custom: true};
          this.update({
            stagedCustomEvent: null,
            customEvent: {...customEventParams, ...ev.detail.customEvent},
          });
        },
        //#endregion

        //#region Data group selector
        getDataGroups: () => {
          /* eslint-disable camelcase */
          return [
            {
              displayName: `Group Membership`,
              groupID: 1,
              isReady: true,
              propertyName: `Group ID`,
            },
            {
              displayName: `My beloved property`,
              groupID: 2,
              isReady: false,
              propertyName: `property`,
            },
            {
              displayName: `Billing Account ID`,
              groupID: 3,
              isReady: true,
              propertyName: `Project Owner Billing account ID`,
            },
          ];
          /* eslint-enable camelcase */
        },
        selectDataGroup: (ev) => {
          this.update({dataGroupID: ev.detail.dataGroup.id});
        },
        //#endregion

        getLineChartData: (isTimeSeries) => (isTimeSeries ? timeData : customData),
        getXAxisOptionsTimeData: () => {
          return {
            unit: XAxisUnit.Time,
          };
        },
        getXAxisOptionsNumberData: () => {
          return {
            unit: XAxisUnit.Number,
          };
        },
        getBucketPaneAttributes: () => {
          return {
            'selected-bucket': {bucketSize: 3, min: 2, max: 12},
            'selected-unit': `frequency`,
          };
        },
        getSidenavSections: () => sidenavSections,
        onSidenavResize: (ev) => this.update({sidenavWidth: ev.detail.width}),
        handleFileSelected: (ev) => this.update({filename: ev.detail.file.name}),
        handleFileRemoved: () => this.update({filename: ``}),
        handleStringToastPortalClick: () => {
          this.update({stringToastPortalId: ++this.state.stringToastPortalId});
        },
        handleHTMLToastPortalClick: () => {
          this.update({HTMLToastPortalId: ++this.state.HTMLToastPortalId});
        },
        getRichTooltipItemsMenuSections: (isGoodUX) => {
          return [
            {
              items: range(1, 7).map((num) => {
                const label = `Funnel ${num}`;
                const text = isGoodUX
                  ? `Specific information about ${label}. \n[Can contain a link.](https://mixpanel.com)`
                  : `${label} \n[link to docs.](https://mixpanel.com) \nThis Is A View Option In The Menu You May Click Here Or A Different Option`;

                return {
                  label,
                  tooltip: {
                    text,
                    'image-src': tooltipImageUrl,
                    placement: `left`,
                    size: `medium`,
                    'delay-in': 250,
                    'delay-out': 250,
                  },
                };
              }),
            },
          ];
        },
      },
    };
  }

  updateElRef(elRef) {
    Object.assign(this.elRefs, elRef);
  }
}

export const DesignSystemEl = defineAndMakeJsxFactory(`design-system`, DesignSystem);