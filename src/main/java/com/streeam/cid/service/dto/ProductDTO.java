package com.streeam.cid.service.dto;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.streeam.cid.domain.Product} entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    @NotNull
    private String partNumber;

    @NotNull
    private String partDescription;

    @NotNull
    private LocalDate releaseDate;

    @NotNull
    private String productGroupCode;

    private String site;

    private String departament;

    @NotNull
    private String methodType;

    @NotNull
    private String methodStatus;

    @NotNull
    private Boolean prime;

    private String unitOfMeasure;


    private String supplierPartNumber;

    private String supplierPartDescription;

    private String curency;

    @Min(value = 0)
    private Integer leadTime;

    @DecimalMin(value = "0")
    private Double minQuantity;

    @DecimalMin(value = "0")
    private BigDecimal latestUnitMaterialCost;

    @DecimalMin(value = "0")
    private BigDecimal costInSupplierCurrency;

    @DecimalMin(value = "0")
    private BigDecimal supplierPrice;

    @DecimalMin(value = "0")
    private BigDecimal costInBaseCurrency;

    @DecimalMin(value = "0")
    private Double scrapPercentage;

    @DecimalMin(value = "0")
    private Double onHandStock;

    @DecimalMin(value = "0")
    private BigDecimal standardComponentCost;

    @DecimalMin(value = "0")
    private BigDecimal standardSubContractCost;

    @DecimalMin(value = "0")
    private BigDecimal standardUnitMaterialCost;

    @DecimalMin(value = "0")
    private BigDecimal standardSetCost;

    @DecimalMin(value = "0")
    private BigDecimal standardRunCost;

    @DecimalMin(value = "0")
    private BigDecimal standardLandedCost1;

    @DecimalMin(value = "0")
    private BigDecimal standardLandedCost2;

    @DecimalMin(value = "0")
    private BigDecimal standardLandedCost3;

    private String comment1;

    private String comment2;

    private String comment3;

    private LocalDate reviewDate1;

    private LocalDate reviewDate2;

    private LocalDate reviewDate3;

    @DecimalMin(value = "0")
    private BigDecimal standardTotalCost;

    @DecimalMin(value = "0")
    private Double minBarchSize;

    @NotNull
    private Boolean obsolete;

    @Min(value = 0)
    private Integer orderMultipler;

    private Set<BomDTO> boms = new HashSet<>();

    private Set<RoutingDTO> routings = new HashSet<>();

    private Long salesOrderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getPartDescription() {
        return partDescription;
    }

    public void setPartDescription(String partDescription) {
        this.partDescription = partDescription;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getProductGroupCode() {
        return productGroupCode;
    }

    public void setProductGroupCode(String productGroupCode) {
        this.productGroupCode = productGroupCode;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getDepartament() {
        return departament;
    }

    public void setDepartament(String departament) {
        this.departament = departament;
    }

    public String getMethodType() {
        return methodType;
    }

    public void setMethodType(String methodType) {
        this.methodType = methodType;
    }

    public String getMethodStatus() {
        return methodStatus;
    }

    public void setMethodStatus(String methodStatus) {
        this.methodStatus = methodStatus;
    }

    public Boolean isPrime() {
        return prime;
    }

    public void setPrime(Boolean prime) {
        this.prime = prime;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public String getSupplierPartNumber() {
        return supplierPartNumber;
    }

    public void setSupplierPartNumber(String supplierPartNumber) {
        this.supplierPartNumber = supplierPartNumber;
    }

    public String getSupplierPartDescription() {
        return supplierPartDescription;
    }

    public void setSupplierPartDescription(String supplierPartDescription) {
        this.supplierPartDescription = supplierPartDescription;
    }

    public String getCurency() {
        return curency;
    }

    public void setCurency(String curency) {
        this.curency = curency;
    }

    public Integer getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(Integer leadTime) {
        this.leadTime = leadTime;
    }

    public Double getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(Double minQuantity) {
        this.minQuantity = minQuantity;
    }

    public BigDecimal getLatestUnitMaterialCost() {
        return latestUnitMaterialCost;
    }

    public void setLatestUnitMaterialCost(BigDecimal latestUnitMaterialCost) {
        this.latestUnitMaterialCost = latestUnitMaterialCost;
    }

    public BigDecimal getCostInSupplierCurrency() {
        return costInSupplierCurrency;
    }

    public void setCostInSupplierCurrency(BigDecimal costInSupplierCurrency) {
        this.costInSupplierCurrency = costInSupplierCurrency;
    }

    public BigDecimal getSupplierPrice() {
        return supplierPrice;
    }

    public void setSupplierPrice(BigDecimal supplierPrice) {
        this.supplierPrice = supplierPrice;
    }

    public BigDecimal getCostInBaseCurrency() {
        return costInBaseCurrency;
    }

    public void setCostInBaseCurrency(BigDecimal costInBaseCurrency) {
        this.costInBaseCurrency = costInBaseCurrency;
    }

    public Double getScrapPercentage() {
        return scrapPercentage;
    }

    public void setScrapPercentage(Double scrapPercentage) {
        this.scrapPercentage = scrapPercentage;
    }

    public Double getOnHandStock() {
        return onHandStock;
    }

    public void setOnHandStock(Double onHandStock) {
        this.onHandStock = onHandStock;
    }

    public BigDecimal getStandardComponentCost() {
        return standardComponentCost;
    }

    public void setStandardComponentCost(BigDecimal standardComponentCost) {
        this.standardComponentCost = standardComponentCost;
    }

    public BigDecimal getStandardSubContractCost() {
        return standardSubContractCost;
    }

    public void setStandardSubContractCost(BigDecimal standardSubContractCost) {
        this.standardSubContractCost = standardSubContractCost;
    }

    public BigDecimal getStandardUnitMaterialCost() {
        return standardUnitMaterialCost;
    }

    public void setStandardUnitMaterialCost(BigDecimal standardUnitMaterialCost) {
        this.standardUnitMaterialCost = standardUnitMaterialCost;
    }

    public BigDecimal getStandardSetCost() {
        return standardSetCost;
    }

    public void setStandardSetCost(BigDecimal standardSetCost) {
        this.standardSetCost = standardSetCost;
    }

    public BigDecimal getStandardRunCost() {
        return standardRunCost;
    }

    public void setStandardRunCost(BigDecimal standardRunCost) {
        this.standardRunCost = standardRunCost;
    }

    public BigDecimal getStandardLandedCost1() {
        return standardLandedCost1;
    }

    public void setStandardLandedCost1(BigDecimal standardLandedCost1) {
        this.standardLandedCost1 = standardLandedCost1;
    }

    public BigDecimal getStandardLandedCost2() {
        return standardLandedCost2;
    }

    public void setStandardLandedCost2(BigDecimal standardLandedCost2) {
        this.standardLandedCost2 = standardLandedCost2;
    }

    public BigDecimal getStandardLandedCost3() {
        return standardLandedCost3;
    }

    public void setStandardLandedCost3(BigDecimal standardLandedCost3) {
        this.standardLandedCost3 = standardLandedCost3;
    }

    public String getComment1() {
        return comment1;
    }

    public void setComment1(String comment1) {
        this.comment1 = comment1;
    }

    public String getComment2() {
        return comment2;
    }

    public void setComment2(String comment2) {
        this.comment2 = comment2;
    }

    public String getComment3() {
        return comment3;
    }

    public void setComment3(String comment3) {
        this.comment3 = comment3;
    }

    public LocalDate getReviewDate1() {
        return reviewDate1;
    }

    public void setReviewDate1(LocalDate reviewDate1) {
        this.reviewDate1 = reviewDate1;
    }

    public LocalDate getReviewDate2() {
        return reviewDate2;
    }

    public void setReviewDate2(LocalDate reviewDate2) {
        this.reviewDate2 = reviewDate2;
    }

    public LocalDate getReviewDate3() {
        return reviewDate3;
    }

    public void setReviewDate3(LocalDate reviewDate3) {
        this.reviewDate3 = reviewDate3;
    }

    public BigDecimal getStandardTotalCost() {
        return standardTotalCost;
    }

    public void setStandardTotalCost(BigDecimal standardTotalCost) {
        this.standardTotalCost = standardTotalCost;
    }

    public Double getMinBarchSize() {
        return minBarchSize;
    }

    public void setMinBarchSize(Double minBarchSize) {
        this.minBarchSize = minBarchSize;
    }

    public Boolean isObsolete() {
        return obsolete;
    }

    public void setObsolete(Boolean obsolete) {
        this.obsolete = obsolete;
    }

    public Integer getOrderMultipler() {
        return orderMultipler;
    }

    public void setOrderMultipler(Integer orderMultipler) {
        this.orderMultipler = orderMultipler;
    }

    public Set<BomDTO> getBoms() {
        return boms;
    }

    public void setBoms(Set<BomDTO> boms) {
        this.boms = boms;
    }

    public Set<RoutingDTO> getRoutings() {
        return routings;
    }

    public void setRoutings(Set<RoutingDTO> routings) {
        this.routings = routings;
    }

    public Long getSalesOrderId() {
        return salesOrderId;
    }

    public void setSalesOrderId(Long salesOrderId) {
        this.salesOrderId = salesOrderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if (productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", partNumber='" + getPartNumber() + "'" +
            ", partDescription='" + getPartDescription() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", productGroupCode='" + getProductGroupCode() + "'" +
            ", site='" + getSite() + "'" +
            ", departament='" + getDepartament() + "'" +
            ", methodType='" + getMethodType() + "'" +
            ", methodStatus='" + getMethodStatus() + "'" +
            ", prime='" + isPrime() + "'" +
            ", unitOfMeasure='" + getUnitOfMeasure() + "'" +
            ", supplierPartNumber='" + getSupplierPartNumber() + "'" +
            ", supplierPartDescription='" + getSupplierPartDescription() + "'" +
            ", curency='" + getCurency() + "'" +
            ", leadTime=" + getLeadTime() +
            ", minQuantity=" + getMinQuantity() +
            ", latestUnitMaterialCost=" + getLatestUnitMaterialCost() +
            ", costInSupplierCurrency=" + getCostInSupplierCurrency() +
            ", supplierPrice=" + getSupplierPrice() +
            ", costInBaseCurrency=" + getCostInBaseCurrency() +
            ", scrapPercentage=" + getScrapPercentage() +
            ", onHandStock=" + getOnHandStock() +
            ", standardComponentCost=" + getStandardComponentCost() +
            ", standardSubContractCost=" + getStandardSubContractCost() +
            ", standardUnitMaterialCost=" + getStandardUnitMaterialCost() +
            ", standardSetCost=" + getStandardSetCost() +
            ", standardRunCost=" + getStandardRunCost() +
            ", standardLandedCost1=" + getStandardLandedCost1() +
            ", standardLandedCost2=" + getStandardLandedCost2() +
            ", standardLandedCost3=" + getStandardLandedCost3() +
            ", comment1='" + getComment1() + "'" +
            ", comment2='" + getComment2() + "'" +
            ", comment3='" + getComment3() + "'" +
            ", reviewDate1='" + getReviewDate1() + "'" +
            ", reviewDate2='" + getReviewDate2() + "'" +
            ", reviewDate3='" + getReviewDate3() + "'" +
            ", standardTotalCost=" + getStandardTotalCost() +
            ", minBarchSize=" + getMinBarchSize() +
            ", obsolete='" + isObsolete() + "'" +
            ", orderMultipler=" + getOrderMultipler() +
            ", salesOrder=" + getSalesOrderId() +
            "}";
    }
}
