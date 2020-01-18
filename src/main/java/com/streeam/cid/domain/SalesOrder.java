package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A SalesOrder.
 */
@Entity
@Table(name = "sales_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SalesOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sales_order_number", nullable = false)
    private String salesOrderNumber;

    @NotNull
    @Column(name = "date_raised", nullable = false)
    private LocalDate dateRaised;

    @Column(name = "so_sales_status")
    private String soSalesStatus;

    @Column(name = "second_sales_reference")
    private String secondSalesReference;

    @Column(name = "currency_code")
    private String currencyCode;

    @Column(name = "exchange_rate")
    private String exchangeRate;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @Column(name = "discount_percent", nullable = false)
    private Double discountPercent;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "our_contact")
    private String ourContact;

    @Column(name = "invoice_address")
    private String invoiceAddress;

    @Column(name = "invoice_country_code")
    private String invoiceCountryCode;

    @Column(name = "sales_order_title")
    private String salesOrderTitle;

    @Column(name = "sales_analysis_1")
    private String salesAnalysis1;

    @Column(name = "sales_analysis_2")
    private String salesAnalysis2;

    @Column(name = "sales_analysis_3")
    private String salesAnalysis3;

    @Column(name = "sales_analysis_4")
    private String salesAnalysis4;

    @Column(name = "sales_analysis_5")
    private String salesAnalysis5;

    @Column(name = "sales_analysis_6")
    private String salesAnalysis6;

    @Column(name = "memo_1")
    private String memo1;

    @Column(name = "memo_2")
    private String memo2;

    @Column(name = "memo_3")
    private String memo3;

    @Column(name = "memo_4")
    private String memo4;

    @Column(name = "memo_5")
    private String memo5;

    @Column(name = "memo_6")
    private String memo6;

    @Column(name = "stock_analysis_01")
    private String stockAnalysis01;

    @Column(name = "stock_analysis_02")
    private String stockAnalysis02;

    @Column(name = "stock_analysis_03")
    private String stockAnalysis03;

    @Column(name = "stock_analysis_04")
    private String stockAnalysis04;

    @Column(name = "stock_analysis_05")
    private String stockAnalysis05;

    @Column(name = "stock_analysis_06")
    private String stockAnalysis06;

    @Column(name = "stock_analysis_07")
    private String stockAnalysis07;

    @Column(name = "stock_analysis_08")
    private String stockAnalysis08;

    @Column(name = "stock_analysis_09")
    private String stockAnalysis09;

    @Column(name = "stock_analysis_10")
    private String stockAnalysis10;

    @Column(name = "delivery_code")
    private String deliveryCode;

    @Column(name = "transaction_code")
    private String transactionCode;

    @Column(name = "code")
    private String code;

    @Column(name = "sales_order_status_code")
    private String salesOrderStatusCode;

    @Column(name = "despatch_status_id")
    private String despatchStatusID;

    @Column(name = "division")
    private String division;

    @Column(name = "line_number")
    private String lineNumber;

    @Column(name = "despatch_status_code")
    private String despatchStatusCode;

    @DecimalMin(value = "0")
    @Column(name = "quantity_ordered")
    private Double quantityOrdered;

    @DecimalMin(value = "0")
    @Column(name = "quantity_outstanding")
    private Double quantityOutstanding;

    @DecimalMin(value = "0")
    @Column(name = "quantity_despatched")
    private Double quantityDespatched;

    @NotNull
    @Column(name = "despatch_date", nullable = false)
    private LocalDate despatchDate;

    @NotNull
    @Column(name = "cust_required_date", nullable = false)
    private LocalDate custRequiredDate;

    @DecimalMin(value = "0")
    @Column(name = "unit_price")
    private Double unitPrice;

    @DecimalMin(value = "0")
    @Column(name = "unit_pricein_base")
    private Double unitPriceinBase;

    @DecimalMin(value = "0")
    @Column(name = "line_discount_percent")
    private Double lineDiscountPercent;

    @DecimalMin(value = "0")
    @Column(name = "margin_percent")
    private Double marginPercent;

    @DecimalMin(value = "0")
    @Column(name = "line_total")
    private Double lineTotal;

    @DecimalMin(value = "0")
    @Column(name = "line_totalin_base")
    private Double lineTotalinBase;

    @NotNull
    @Column(name = "tax_code", nullable = false)
    private String taxCode;

    @NotNull
    @Column(name = "nominal_code", nullable = false)
    private String nominalCode;

    @NotNull
    @Column(name = "on_hold", nullable = false)
    private Boolean onHold;

    @NotNull
    @Column(name = "r_code", nullable = false)
    private String rCode;

    @DecimalMin(value = "0")
    @Column(name = "standard_margin")
    private Double standardMargin;

    @NotNull
    @Column(name = "delivery_address", nullable = false)
    private String deliveryAddress;

    @Column(name = "delivery_address_description")
    private String deliveryAddressDescription;

    @Column(name = "delivery_country_code")
    private String deliveryCountryCode;

    @Column(name = "sales_order_status")
    private String salesOrderStatus;

    @ManyToOne
    @JsonIgnoreProperties("salesOrders")
    private Customer customer;

    @OneToMany(mappedBy = "salesOrder")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PurchaseRequestChild> purchaseRequestChildren = new HashSet<>();

    @OneToMany(mappedBy = "salesOrder")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSalesOrderNumber() {
        return salesOrderNumber;
    }

    public SalesOrder salesOrderNumber(String salesOrderNumber) {
        this.salesOrderNumber = salesOrderNumber;
        return this;
    }

    public void setSalesOrderNumber(String salesOrderNumber) {
        this.salesOrderNumber = salesOrderNumber;
    }

    public LocalDate getDateRaised() {
        return dateRaised;
    }

    public SalesOrder dateRaised(LocalDate dateRaised) {
        this.dateRaised = dateRaised;
        return this;
    }

    public void setDateRaised(LocalDate dateRaised) {
        this.dateRaised = dateRaised;
    }

    public String getSoSalesStatus() {
        return soSalesStatus;
    }

    public SalesOrder soSalesStatus(String soSalesStatus) {
        this.soSalesStatus = soSalesStatus;
        return this;
    }

    public void setSoSalesStatus(String soSalesStatus) {
        this.soSalesStatus = soSalesStatus;
    }

    public String getSecondSalesReference() {
        return secondSalesReference;
    }

    public SalesOrder secondSalesReference(String secondSalesReference) {
        this.secondSalesReference = secondSalesReference;
        return this;
    }

    public void setSecondSalesReference(String secondSalesReference) {
        this.secondSalesReference = secondSalesReference;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public SalesOrder currencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
        return this;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getExchangeRate() {
        return exchangeRate;
    }

    public SalesOrder exchangeRate(String exchangeRate) {
        this.exchangeRate = exchangeRate;
        return this;
    }

    public void setExchangeRate(String exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public SalesOrder discountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
        return this;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getContactName() {
        return contactName;
    }

    public SalesOrder contactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getOurContact() {
        return ourContact;
    }

    public SalesOrder ourContact(String ourContact) {
        this.ourContact = ourContact;
        return this;
    }

    public void setOurContact(String ourContact) {
        this.ourContact = ourContact;
    }

    public String getInvoiceAddress() {
        return invoiceAddress;
    }

    public SalesOrder invoiceAddress(String invoiceAddress) {
        this.invoiceAddress = invoiceAddress;
        return this;
    }

    public void setInvoiceAddress(String invoiceAddress) {
        this.invoiceAddress = invoiceAddress;
    }

    public String getInvoiceCountryCode() {
        return invoiceCountryCode;
    }

    public SalesOrder invoiceCountryCode(String invoiceCountryCode) {
        this.invoiceCountryCode = invoiceCountryCode;
        return this;
    }

    public void setInvoiceCountryCode(String invoiceCountryCode) {
        this.invoiceCountryCode = invoiceCountryCode;
    }

    public String getSalesOrderTitle() {
        return salesOrderTitle;
    }

    public SalesOrder salesOrderTitle(String salesOrderTitle) {
        this.salesOrderTitle = salesOrderTitle;
        return this;
    }

    public void setSalesOrderTitle(String salesOrderTitle) {
        this.salesOrderTitle = salesOrderTitle;
    }

    public String getSalesAnalysis1() {
        return salesAnalysis1;
    }

    public SalesOrder salesAnalysis1(String salesAnalysis1) {
        this.salesAnalysis1 = salesAnalysis1;
        return this;
    }

    public void setSalesAnalysis1(String salesAnalysis1) {
        this.salesAnalysis1 = salesAnalysis1;
    }

    public String getSalesAnalysis2() {
        return salesAnalysis2;
    }

    public SalesOrder salesAnalysis2(String salesAnalysis2) {
        this.salesAnalysis2 = salesAnalysis2;
        return this;
    }

    public void setSalesAnalysis2(String salesAnalysis2) {
        this.salesAnalysis2 = salesAnalysis2;
    }

    public String getSalesAnalysis3() {
        return salesAnalysis3;
    }

    public SalesOrder salesAnalysis3(String salesAnalysis3) {
        this.salesAnalysis3 = salesAnalysis3;
        return this;
    }

    public void setSalesAnalysis3(String salesAnalysis3) {
        this.salesAnalysis3 = salesAnalysis3;
    }

    public String getSalesAnalysis4() {
        return salesAnalysis4;
    }

    public SalesOrder salesAnalysis4(String salesAnalysis4) {
        this.salesAnalysis4 = salesAnalysis4;
        return this;
    }

    public void setSalesAnalysis4(String salesAnalysis4) {
        this.salesAnalysis4 = salesAnalysis4;
    }

    public String getSalesAnalysis5() {
        return salesAnalysis5;
    }

    public SalesOrder salesAnalysis5(String salesAnalysis5) {
        this.salesAnalysis5 = salesAnalysis5;
        return this;
    }

    public void setSalesAnalysis5(String salesAnalysis5) {
        this.salesAnalysis5 = salesAnalysis5;
    }

    public String getSalesAnalysis6() {
        return salesAnalysis6;
    }

    public SalesOrder salesAnalysis6(String salesAnalysis6) {
        this.salesAnalysis6 = salesAnalysis6;
        return this;
    }

    public void setSalesAnalysis6(String salesAnalysis6) {
        this.salesAnalysis6 = salesAnalysis6;
    }

    public String getMemo1() {
        return memo1;
    }

    public SalesOrder memo1(String memo1) {
        this.memo1 = memo1;
        return this;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    public String getMemo2() {
        return memo2;
    }

    public SalesOrder memo2(String memo2) {
        this.memo2 = memo2;
        return this;
    }

    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    public String getMemo3() {
        return memo3;
    }

    public SalesOrder memo3(String memo3) {
        this.memo3 = memo3;
        return this;
    }

    public void setMemo3(String memo3) {
        this.memo3 = memo3;
    }

    public String getMemo4() {
        return memo4;
    }

    public SalesOrder memo4(String memo4) {
        this.memo4 = memo4;
        return this;
    }

    public void setMemo4(String memo4) {
        this.memo4 = memo4;
    }

    public String getMemo5() {
        return memo5;
    }

    public SalesOrder memo5(String memo5) {
        this.memo5 = memo5;
        return this;
    }

    public void setMemo5(String memo5) {
        this.memo5 = memo5;
    }

    public String getMemo6() {
        return memo6;
    }

    public SalesOrder memo6(String memo6) {
        this.memo6 = memo6;
        return this;
    }

    public void setMemo6(String memo6) {
        this.memo6 = memo6;
    }

    public String getStockAnalysis01() {
        return stockAnalysis01;
    }

    public SalesOrder stockAnalysis01(String stockAnalysis01) {
        this.stockAnalysis01 = stockAnalysis01;
        return this;
    }

    public void setStockAnalysis01(String stockAnalysis01) {
        this.stockAnalysis01 = stockAnalysis01;
    }

    public String getStockAnalysis02() {
        return stockAnalysis02;
    }

    public SalesOrder stockAnalysis02(String stockAnalysis02) {
        this.stockAnalysis02 = stockAnalysis02;
        return this;
    }

    public void setStockAnalysis02(String stockAnalysis02) {
        this.stockAnalysis02 = stockAnalysis02;
    }

    public String getStockAnalysis03() {
        return stockAnalysis03;
    }

    public SalesOrder stockAnalysis03(String stockAnalysis03) {
        this.stockAnalysis03 = stockAnalysis03;
        return this;
    }

    public void setStockAnalysis03(String stockAnalysis03) {
        this.stockAnalysis03 = stockAnalysis03;
    }

    public String getStockAnalysis04() {
        return stockAnalysis04;
    }

    public SalesOrder stockAnalysis04(String stockAnalysis04) {
        this.stockAnalysis04 = stockAnalysis04;
        return this;
    }

    public void setStockAnalysis04(String stockAnalysis04) {
        this.stockAnalysis04 = stockAnalysis04;
    }

    public String getStockAnalysis05() {
        return stockAnalysis05;
    }

    public SalesOrder stockAnalysis05(String stockAnalysis05) {
        this.stockAnalysis05 = stockAnalysis05;
        return this;
    }

    public void setStockAnalysis05(String stockAnalysis05) {
        this.stockAnalysis05 = stockAnalysis05;
    }

    public String getStockAnalysis06() {
        return stockAnalysis06;
    }

    public SalesOrder stockAnalysis06(String stockAnalysis06) {
        this.stockAnalysis06 = stockAnalysis06;
        return this;
    }

    public void setStockAnalysis06(String stockAnalysis06) {
        this.stockAnalysis06 = stockAnalysis06;
    }

    public String getStockAnalysis07() {
        return stockAnalysis07;
    }

    public SalesOrder stockAnalysis07(String stockAnalysis07) {
        this.stockAnalysis07 = stockAnalysis07;
        return this;
    }

    public void setStockAnalysis07(String stockAnalysis07) {
        this.stockAnalysis07 = stockAnalysis07;
    }

    public String getStockAnalysis08() {
        return stockAnalysis08;
    }

    public SalesOrder stockAnalysis08(String stockAnalysis08) {
        this.stockAnalysis08 = stockAnalysis08;
        return this;
    }

    public void setStockAnalysis08(String stockAnalysis08) {
        this.stockAnalysis08 = stockAnalysis08;
    }

    public String getStockAnalysis09() {
        return stockAnalysis09;
    }

    public SalesOrder stockAnalysis09(String stockAnalysis09) {
        this.stockAnalysis09 = stockAnalysis09;
        return this;
    }

    public void setStockAnalysis09(String stockAnalysis09) {
        this.stockAnalysis09 = stockAnalysis09;
    }

    public String getStockAnalysis10() {
        return stockAnalysis10;
    }

    public SalesOrder stockAnalysis10(String stockAnalysis10) {
        this.stockAnalysis10 = stockAnalysis10;
        return this;
    }

    public void setStockAnalysis10(String stockAnalysis10) {
        this.stockAnalysis10 = stockAnalysis10;
    }

    public String getDeliveryCode() {
        return deliveryCode;
    }

    public SalesOrder deliveryCode(String deliveryCode) {
        this.deliveryCode = deliveryCode;
        return this;
    }

    public void setDeliveryCode(String deliveryCode) {
        this.deliveryCode = deliveryCode;
    }

    public String getTransactionCode() {
        return transactionCode;
    }

    public SalesOrder transactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
        return this;
    }

    public void setTransactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
    }

    public String getCode() {
        return code;
    }

    public SalesOrder code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSalesOrderStatusCode() {
        return salesOrderStatusCode;
    }

    public SalesOrder salesOrderStatusCode(String salesOrderStatusCode) {
        this.salesOrderStatusCode = salesOrderStatusCode;
        return this;
    }

    public void setSalesOrderStatusCode(String salesOrderStatusCode) {
        this.salesOrderStatusCode = salesOrderStatusCode;
    }

    public String getDespatchStatusID() {
        return despatchStatusID;
    }

    public SalesOrder despatchStatusID(String despatchStatusID) {
        this.despatchStatusID = despatchStatusID;
        return this;
    }

    public void setDespatchStatusID(String despatchStatusID) {
        this.despatchStatusID = despatchStatusID;
    }

    public String getDivision() {
        return division;
    }

    public SalesOrder division(String division) {
        this.division = division;
        return this;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getLineNumber() {
        return lineNumber;
    }

    public SalesOrder lineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
        return this;
    }

    public void setLineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getDespatchStatusCode() {
        return despatchStatusCode;
    }

    public SalesOrder despatchStatusCode(String despatchStatusCode) {
        this.despatchStatusCode = despatchStatusCode;
        return this;
    }

    public void setDespatchStatusCode(String despatchStatusCode) {
        this.despatchStatusCode = despatchStatusCode;
    }

    public Double getQuantityOrdered() {
        return quantityOrdered;
    }

    public SalesOrder quantityOrdered(Double quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
        return this;
    }

    public void setQuantityOrdered(Double quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    public Double getQuantityOutstanding() {
        return quantityOutstanding;
    }

    public SalesOrder quantityOutstanding(Double quantityOutstanding) {
        this.quantityOutstanding = quantityOutstanding;
        return this;
    }

    public void setQuantityOutstanding(Double quantityOutstanding) {
        this.quantityOutstanding = quantityOutstanding;
    }

    public Double getQuantityDespatched() {
        return quantityDespatched;
    }

    public SalesOrder quantityDespatched(Double quantityDespatched) {
        this.quantityDespatched = quantityDespatched;
        return this;
    }

    public void setQuantityDespatched(Double quantityDespatched) {
        this.quantityDespatched = quantityDespatched;
    }

    public LocalDate getDespatchDate() {
        return despatchDate;
    }

    public SalesOrder despatchDate(LocalDate despatchDate) {
        this.despatchDate = despatchDate;
        return this;
    }

    public void setDespatchDate(LocalDate despatchDate) {
        this.despatchDate = despatchDate;
    }

    public LocalDate getCustRequiredDate() {
        return custRequiredDate;
    }

    public SalesOrder custRequiredDate(LocalDate custRequiredDate) {
        this.custRequiredDate = custRequiredDate;
        return this;
    }

    public void setCustRequiredDate(LocalDate custRequiredDate) {
        this.custRequiredDate = custRequiredDate;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public SalesOrder unitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getUnitPriceinBase() {
        return unitPriceinBase;
    }

    public SalesOrder unitPriceinBase(Double unitPriceinBase) {
        this.unitPriceinBase = unitPriceinBase;
        return this;
    }

    public void setUnitPriceinBase(Double unitPriceinBase) {
        this.unitPriceinBase = unitPriceinBase;
    }

    public Double getLineDiscountPercent() {
        return lineDiscountPercent;
    }

    public SalesOrder lineDiscountPercent(Double lineDiscountPercent) {
        this.lineDiscountPercent = lineDiscountPercent;
        return this;
    }

    public void setLineDiscountPercent(Double lineDiscountPercent) {
        this.lineDiscountPercent = lineDiscountPercent;
    }

    public Double getMarginPercent() {
        return marginPercent;
    }

    public SalesOrder marginPercent(Double marginPercent) {
        this.marginPercent = marginPercent;
        return this;
    }

    public void setMarginPercent(Double marginPercent) {
        this.marginPercent = marginPercent;
    }

    public Double getLineTotal() {
        return lineTotal;
    }

    public SalesOrder lineTotal(Double lineTotal) {
        this.lineTotal = lineTotal;
        return this;
    }

    public void setLineTotal(Double lineTotal) {
        this.lineTotal = lineTotal;
    }

    public Double getLineTotalinBase() {
        return lineTotalinBase;
    }

    public SalesOrder lineTotalinBase(Double lineTotalinBase) {
        this.lineTotalinBase = lineTotalinBase;
        return this;
    }

    public void setLineTotalinBase(Double lineTotalinBase) {
        this.lineTotalinBase = lineTotalinBase;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public SalesOrder taxCode(String taxCode) {
        this.taxCode = taxCode;
        return this;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getNominalCode() {
        return nominalCode;
    }

    public SalesOrder nominalCode(String nominalCode) {
        this.nominalCode = nominalCode;
        return this;
    }

    public void setNominalCode(String nominalCode) {
        this.nominalCode = nominalCode;
    }

    public Boolean isOnHold() {
        return onHold;
    }

    public SalesOrder onHold(Boolean onHold) {
        this.onHold = onHold;
        return this;
    }

    public void setOnHold(Boolean onHold) {
        this.onHold = onHold;
    }

    public String getrCode() {
        return rCode;
    }

    public SalesOrder rCode(String rCode) {
        this.rCode = rCode;
        return this;
    }

    public void setrCode(String rCode) {
        this.rCode = rCode;
    }

    public Double getStandardMargin() {
        return standardMargin;
    }

    public SalesOrder standardMargin(Double standardMargin) {
        this.standardMargin = standardMargin;
        return this;
    }

    public void setStandardMargin(Double standardMargin) {
        this.standardMargin = standardMargin;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public SalesOrder deliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
        return this;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getDeliveryAddressDescription() {
        return deliveryAddressDescription;
    }

    public SalesOrder deliveryAddressDescription(String deliveryAddressDescription) {
        this.deliveryAddressDescription = deliveryAddressDescription;
        return this;
    }

    public void setDeliveryAddressDescription(String deliveryAddressDescription) {
        this.deliveryAddressDescription = deliveryAddressDescription;
    }

    public String getDeliveryCountryCode() {
        return deliveryCountryCode;
    }

    public SalesOrder deliveryCountryCode(String deliveryCountryCode) {
        this.deliveryCountryCode = deliveryCountryCode;
        return this;
    }

    public void setDeliveryCountryCode(String deliveryCountryCode) {
        this.deliveryCountryCode = deliveryCountryCode;
    }

    public String getSalesOrderStatus() {
        return salesOrderStatus;
    }

    public SalesOrder salesOrderStatus(String salesOrderStatus) {
        this.salesOrderStatus = salesOrderStatus;
        return this;
    }

    public void setSalesOrderStatus(String salesOrderStatus) {
        this.salesOrderStatus = salesOrderStatus;
    }

    public Customer getCustomer() {
        return customer;
    }

    public SalesOrder customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<PurchaseRequestChild> getPurchaseRequestChildren() {
        return purchaseRequestChildren;
    }

    public SalesOrder purchaseRequestChildren(Set<PurchaseRequestChild> purchaseRequestChildren) {
        this.purchaseRequestChildren = purchaseRequestChildren;
        return this;
    }

    public SalesOrder addPurchaseRequestChild(PurchaseRequestChild purchaseRequestChild) {
        this.purchaseRequestChildren.add(purchaseRequestChild);
        purchaseRequestChild.setSalesOrder(this);
        return this;
    }

    public SalesOrder removePurchaseRequestChild(PurchaseRequestChild purchaseRequestChild) {
        this.purchaseRequestChildren.remove(purchaseRequestChild);
        purchaseRequestChild.setSalesOrder(null);
        return this;
    }

    public void setPurchaseRequestChildren(Set<PurchaseRequestChild> purchaseRequestChildren) {
        this.purchaseRequestChildren = purchaseRequestChildren;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public SalesOrder products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public SalesOrder addProducts(Product product) {
        this.products.add(product);
        product.setSalesOrder(this);
        return this;
    }

    public SalesOrder removeProducts(Product product) {
        this.products.remove(product);
        product.setSalesOrder(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SalesOrder)) {
            return false;
        }
        return id != null && id.equals(((SalesOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SalesOrder{" +
            "id=" + getId() +
            ", salesOrderNumber='" + getSalesOrderNumber() + "'" +
            ", dateRaised='" + getDateRaised() + "'" +
            ", soSalesStatus='" + getSoSalesStatus() + "'" +
            ", secondSalesReference='" + getSecondSalesReference() + "'" +
            ", currencyCode='" + getCurrencyCode() + "'" +
            ", exchangeRate='" + getExchangeRate() + "'" +
            ", discountPercent=" + getDiscountPercent() +
            ", contactName='" + getContactName() + "'" +
            ", ourContact='" + getOurContact() + "'" +
            ", invoiceAddress='" + getInvoiceAddress() + "'" +
            ", invoiceCountryCode='" + getInvoiceCountryCode() + "'" +
            ", salesOrderTitle='" + getSalesOrderTitle() + "'" +
            ", salesAnalysis1='" + getSalesAnalysis1() + "'" +
            ", salesAnalysis2='" + getSalesAnalysis2() + "'" +
            ", salesAnalysis3='" + getSalesAnalysis3() + "'" +
            ", salesAnalysis4='" + getSalesAnalysis4() + "'" +
            ", salesAnalysis5='" + getSalesAnalysis5() + "'" +
            ", salesAnalysis6='" + getSalesAnalysis6() + "'" +
            ", memo1='" + getMemo1() + "'" +
            ", memo2='" + getMemo2() + "'" +
            ", memo3='" + getMemo3() + "'" +
            ", memo4='" + getMemo4() + "'" +
            ", memo5='" + getMemo5() + "'" +
            ", memo6='" + getMemo6() + "'" +
            ", stockAnalysis01='" + getStockAnalysis01() + "'" +
            ", stockAnalysis02='" + getStockAnalysis02() + "'" +
            ", stockAnalysis03='" + getStockAnalysis03() + "'" +
            ", stockAnalysis04='" + getStockAnalysis04() + "'" +
            ", stockAnalysis05='" + getStockAnalysis05() + "'" +
            ", stockAnalysis06='" + getStockAnalysis06() + "'" +
            ", stockAnalysis07='" + getStockAnalysis07() + "'" +
            ", stockAnalysis08='" + getStockAnalysis08() + "'" +
            ", stockAnalysis09='" + getStockAnalysis09() + "'" +
            ", stockAnalysis10='" + getStockAnalysis10() + "'" +
            ", deliveryCode='" + getDeliveryCode() + "'" +
            ", transactionCode='" + getTransactionCode() + "'" +
            ", code='" + getCode() + "'" +
            ", salesOrderStatusCode='" + getSalesOrderStatusCode() + "'" +
            ", despatchStatusID='" + getDespatchStatusID() + "'" +
            ", division='" + getDivision() + "'" +
            ", lineNumber='" + getLineNumber() + "'" +
            ", despatchStatusCode='" + getDespatchStatusCode() + "'" +
            ", quantityOrdered=" + getQuantityOrdered() +
            ", quantityOutstanding=" + getQuantityOutstanding() +
            ", quantityDespatched=" + getQuantityDespatched() +
            ", despatchDate='" + getDespatchDate() + "'" +
            ", custRequiredDate='" + getCustRequiredDate() + "'" +
            ", unitPrice=" + getUnitPrice() +
            ", unitPriceinBase=" + getUnitPriceinBase() +
            ", lineDiscountPercent=" + getLineDiscountPercent() +
            ", marginPercent=" + getMarginPercent() +
            ", lineTotal=" + getLineTotal() +
            ", lineTotalinBase=" + getLineTotalinBase() +
            ", taxCode='" + getTaxCode() + "'" +
            ", nominalCode='" + getNominalCode() + "'" +
            ", onHold='" + isOnHold() + "'" +
            ", rCode='" + getrCode() + "'" +
            ", standardMargin=" + getStandardMargin() +
            ", deliveryAddress='" + getDeliveryAddress() + "'" +
            ", deliveryAddressDescription='" + getDeliveryAddressDescription() + "'" +
            ", deliveryCountryCode='" + getDeliveryCountryCode() + "'" +
            ", salesOrderStatus='" + getSalesOrderStatus() + "'" +
            "}";
    }
}
