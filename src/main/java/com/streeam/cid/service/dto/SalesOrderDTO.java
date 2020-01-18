package com.streeam.cid.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.SalesOrder} entity.
 */
public class SalesOrderDTO implements Serializable {

    private Long id;

    @NotNull
    private String salesOrderNumber;

    @NotNull
    private LocalDate dateRaised;

    private String soSalesStatus;

    private String secondSalesReference;

    private String currencyCode;

    private String exchangeRate;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    private Double discountPercent;

    private String contactName;

    private String ourContact;

    private String invoiceAddress;

    private String invoiceCountryCode;

    private String salesOrderTitle;

    private String salesAnalysis1;

    private String salesAnalysis2;

    private String salesAnalysis3;

    private String salesAnalysis4;

    private String salesAnalysis5;

    private String salesAnalysis6;

    private String memo1;

    private String memo2;

    private String memo3;

    private String memo4;

    private String memo5;

    private String memo6;

    private String stockAnalysis01;

    private String stockAnalysis02;

    private String stockAnalysis03;

    private String stockAnalysis04;

    private String stockAnalysis05;

    private String stockAnalysis06;

    private String stockAnalysis07;

    private String stockAnalysis08;

    private String stockAnalysis09;

    private String stockAnalysis10;

    private String deliveryCode;

    private String transactionCode;

    private String code;

    private String salesOrderStatusCode;

    private String despatchStatusID;

    private String division;

    private String lineNumber;

    private String despatchStatusCode;

    @DecimalMin(value = "0")
    private Double quantityOrdered;

    @DecimalMin(value = "0")
    private Double quantityOutstanding;

    @DecimalMin(value = "0")
    private Double quantityDespatched;

    @NotNull
    private LocalDate despatchDate;

    @NotNull
    private LocalDate custRequiredDate;

    @DecimalMin(value = "0")
    private Double unitPrice;

    @DecimalMin(value = "0")
    private Double unitPriceinBase;

    @DecimalMin(value = "0")
    private Double lineDiscountPercent;

    @DecimalMin(value = "0")
    private Double marginPercent;

    @DecimalMin(value = "0")
    private Double lineTotal;

    @DecimalMin(value = "0")
    private Double lineTotalinBase;

    @NotNull
    private String taxCode;

    @NotNull
    private String nominalCode;

    @NotNull
    private Boolean onHold;

    @NotNull
    private String rCode;

    @DecimalMin(value = "0")
    private Double standardMargin;

    @NotNull
    private String deliveryAddress;

    private String deliveryAddressDescription;

    private String deliveryCountryCode;

    private String salesOrderStatus;


    private Long customerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSalesOrderNumber() {
        return salesOrderNumber;
    }

    public void setSalesOrderNumber(String salesOrderNumber) {
        this.salesOrderNumber = salesOrderNumber;
    }

    public LocalDate getDateRaised() {
        return dateRaised;
    }

    public void setDateRaised(LocalDate dateRaised) {
        this.dateRaised = dateRaised;
    }

    public String getSoSalesStatus() {
        return soSalesStatus;
    }

    public void setSoSalesStatus(String soSalesStatus) {
        this.soSalesStatus = soSalesStatus;
    }

    public String getSecondSalesReference() {
        return secondSalesReference;
    }

    public void setSecondSalesReference(String secondSalesReference) {
        this.secondSalesReference = secondSalesReference;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(String exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getOurContact() {
        return ourContact;
    }

    public void setOurContact(String ourContact) {
        this.ourContact = ourContact;
    }

    public String getInvoiceAddress() {
        return invoiceAddress;
    }

    public void setInvoiceAddress(String invoiceAddress) {
        this.invoiceAddress = invoiceAddress;
    }

    public String getInvoiceCountryCode() {
        return invoiceCountryCode;
    }

    public void setInvoiceCountryCode(String invoiceCountryCode) {
        this.invoiceCountryCode = invoiceCountryCode;
    }

    public String getSalesOrderTitle() {
        return salesOrderTitle;
    }

    public void setSalesOrderTitle(String salesOrderTitle) {
        this.salesOrderTitle = salesOrderTitle;
    }

    public String getSalesAnalysis1() {
        return salesAnalysis1;
    }

    public void setSalesAnalysis1(String salesAnalysis1) {
        this.salesAnalysis1 = salesAnalysis1;
    }

    public String getSalesAnalysis2() {
        return salesAnalysis2;
    }

    public void setSalesAnalysis2(String salesAnalysis2) {
        this.salesAnalysis2 = salesAnalysis2;
    }

    public String getSalesAnalysis3() {
        return salesAnalysis3;
    }

    public void setSalesAnalysis3(String salesAnalysis3) {
        this.salesAnalysis3 = salesAnalysis3;
    }

    public String getSalesAnalysis4() {
        return salesAnalysis4;
    }

    public void setSalesAnalysis4(String salesAnalysis4) {
        this.salesAnalysis4 = salesAnalysis4;
    }

    public String getSalesAnalysis5() {
        return salesAnalysis5;
    }

    public void setSalesAnalysis5(String salesAnalysis5) {
        this.salesAnalysis5 = salesAnalysis5;
    }

    public String getSalesAnalysis6() {
        return salesAnalysis6;
    }

    public void setSalesAnalysis6(String salesAnalysis6) {
        this.salesAnalysis6 = salesAnalysis6;
    }

    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    public String getMemo2() {
        return memo2;
    }

    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    public String getMemo3() {
        return memo3;
    }

    public void setMemo3(String memo3) {
        this.memo3 = memo3;
    }

    public String getMemo4() {
        return memo4;
    }

    public void setMemo4(String memo4) {
        this.memo4 = memo4;
    }

    public String getMemo5() {
        return memo5;
    }

    public void setMemo5(String memo5) {
        this.memo5 = memo5;
    }

    public String getMemo6() {
        return memo6;
    }

    public void setMemo6(String memo6) {
        this.memo6 = memo6;
    }

    public String getStockAnalysis01() {
        return stockAnalysis01;
    }

    public void setStockAnalysis01(String stockAnalysis01) {
        this.stockAnalysis01 = stockAnalysis01;
    }

    public String getStockAnalysis02() {
        return stockAnalysis02;
    }

    public void setStockAnalysis02(String stockAnalysis02) {
        this.stockAnalysis02 = stockAnalysis02;
    }

    public String getStockAnalysis03() {
        return stockAnalysis03;
    }

    public void setStockAnalysis03(String stockAnalysis03) {
        this.stockAnalysis03 = stockAnalysis03;
    }

    public String getStockAnalysis04() {
        return stockAnalysis04;
    }

    public void setStockAnalysis04(String stockAnalysis04) {
        this.stockAnalysis04 = stockAnalysis04;
    }

    public String getStockAnalysis05() {
        return stockAnalysis05;
    }

    public void setStockAnalysis05(String stockAnalysis05) {
        this.stockAnalysis05 = stockAnalysis05;
    }

    public String getStockAnalysis06() {
        return stockAnalysis06;
    }

    public void setStockAnalysis06(String stockAnalysis06) {
        this.stockAnalysis06 = stockAnalysis06;
    }

    public String getStockAnalysis07() {
        return stockAnalysis07;
    }

    public void setStockAnalysis07(String stockAnalysis07) {
        this.stockAnalysis07 = stockAnalysis07;
    }

    public String getStockAnalysis08() {
        return stockAnalysis08;
    }

    public void setStockAnalysis08(String stockAnalysis08) {
        this.stockAnalysis08 = stockAnalysis08;
    }

    public String getStockAnalysis09() {
        return stockAnalysis09;
    }

    public void setStockAnalysis09(String stockAnalysis09) {
        this.stockAnalysis09 = stockAnalysis09;
    }

    public String getStockAnalysis10() {
        return stockAnalysis10;
    }

    public void setStockAnalysis10(String stockAnalysis10) {
        this.stockAnalysis10 = stockAnalysis10;
    }

    public String getDeliveryCode() {
        return deliveryCode;
    }

    public void setDeliveryCode(String deliveryCode) {
        this.deliveryCode = deliveryCode;
    }

    public String getTransactionCode() {
        return transactionCode;
    }

    public void setTransactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSalesOrderStatusCode() {
        return salesOrderStatusCode;
    }

    public void setSalesOrderStatusCode(String salesOrderStatusCode) {
        this.salesOrderStatusCode = salesOrderStatusCode;
    }

    public String getDespatchStatusID() {
        return despatchStatusID;
    }

    public void setDespatchStatusID(String despatchStatusID) {
        this.despatchStatusID = despatchStatusID;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getDespatchStatusCode() {
        return despatchStatusCode;
    }

    public void setDespatchStatusCode(String despatchStatusCode) {
        this.despatchStatusCode = despatchStatusCode;
    }

    public Double getQuantityOrdered() {
        return quantityOrdered;
    }

    public void setQuantityOrdered(Double quantityOrdered) {
        this.quantityOrdered = quantityOrdered;
    }

    public Double getQuantityOutstanding() {
        return quantityOutstanding;
    }

    public void setQuantityOutstanding(Double quantityOutstanding) {
        this.quantityOutstanding = quantityOutstanding;
    }

    public Double getQuantityDespatched() {
        return quantityDespatched;
    }

    public void setQuantityDespatched(Double quantityDespatched) {
        this.quantityDespatched = quantityDespatched;
    }

    public LocalDate getDespatchDate() {
        return despatchDate;
    }

    public void setDespatchDate(LocalDate despatchDate) {
        this.despatchDate = despatchDate;
    }

    public LocalDate getCustRequiredDate() {
        return custRequiredDate;
    }

    public void setCustRequiredDate(LocalDate custRequiredDate) {
        this.custRequiredDate = custRequiredDate;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getUnitPriceinBase() {
        return unitPriceinBase;
    }

    public void setUnitPriceinBase(Double unitPriceinBase) {
        this.unitPriceinBase = unitPriceinBase;
    }

    public Double getLineDiscountPercent() {
        return lineDiscountPercent;
    }

    public void setLineDiscountPercent(Double lineDiscountPercent) {
        this.lineDiscountPercent = lineDiscountPercent;
    }

    public Double getMarginPercent() {
        return marginPercent;
    }

    public void setMarginPercent(Double marginPercent) {
        this.marginPercent = marginPercent;
    }

    public Double getLineTotal() {
        return lineTotal;
    }

    public void setLineTotal(Double lineTotal) {
        this.lineTotal = lineTotal;
    }

    public Double getLineTotalinBase() {
        return lineTotalinBase;
    }

    public void setLineTotalinBase(Double lineTotalinBase) {
        this.lineTotalinBase = lineTotalinBase;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getNominalCode() {
        return nominalCode;
    }

    public void setNominalCode(String nominalCode) {
        this.nominalCode = nominalCode;
    }

    public Boolean isOnHold() {
        return onHold;
    }

    public void setOnHold(Boolean onHold) {
        this.onHold = onHold;
    }

    public String getrCode() {
        return rCode;
    }

    public void setrCode(String rCode) {
        this.rCode = rCode;
    }

    public Double getStandardMargin() {
        return standardMargin;
    }

    public void setStandardMargin(Double standardMargin) {
        this.standardMargin = standardMargin;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getDeliveryAddressDescription() {
        return deliveryAddressDescription;
    }

    public void setDeliveryAddressDescription(String deliveryAddressDescription) {
        this.deliveryAddressDescription = deliveryAddressDescription;
    }

    public String getDeliveryCountryCode() {
        return deliveryCountryCode;
    }

    public void setDeliveryCountryCode(String deliveryCountryCode) {
        this.deliveryCountryCode = deliveryCountryCode;
    }

    public String getSalesOrderStatus() {
        return salesOrderStatus;
    }

    public void setSalesOrderStatus(String salesOrderStatus) {
        this.salesOrderStatus = salesOrderStatus;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SalesOrderDTO salesOrderDTO = (SalesOrderDTO) o;
        if (salesOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesOrderDTO{" +
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
            ", customer=" + getCustomerId() +
            "}";
    }
}
