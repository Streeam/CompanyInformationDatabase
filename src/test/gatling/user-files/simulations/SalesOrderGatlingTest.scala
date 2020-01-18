import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the SalesOrder entity.
 */
class SalesOrderGatlingTest extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseUrl(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")
        .silentResources // Silence all resources like css or css so they don't clutter the results

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authentication = Map(
        "Content-Type" -> """application/json""",
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "Authorization" -> "${access_token}"
    )

    val scn = scenario("Test the SalesOrder entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))
        ).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authenticate")
        .headers(headers_http_authentication)
        .body(StringBody("""{"username":"admin", "password":"admin"}""")).asJson
        .check(header("Authorization").saveAs("access_token"))).exitHereIfFailed
        .pause(2)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all salesOrders")
            .get("/api/sales-orders")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new salesOrder")
            .post("/api/sales-orders")
            .headers(headers_http_authenticated)
            .body(StringBody("""{
                "id":null
                , "salesOrderNumber":"SAMPLE_TEXT"
                , "dateRaised":"2020-01-01T00:00:00.000Z"
                , "soSalesStatus":"SAMPLE_TEXT"
                , "secondSalesReference":"SAMPLE_TEXT"
                , "currencyCode":"SAMPLE_TEXT"
                , "exchangeRate":"SAMPLE_TEXT"
                , "discountPercent":null
                , "contactName":"SAMPLE_TEXT"
                , "ourContact":"SAMPLE_TEXT"
                , "invoiceAddress":"SAMPLE_TEXT"
                , "invoiceCountryCode":"SAMPLE_TEXT"
                , "salesOrderTitle":"SAMPLE_TEXT"
                , "salesAnalysis1":"SAMPLE_TEXT"
                , "salesAnalysis2":"SAMPLE_TEXT"
                , "salesAnalysis3":"SAMPLE_TEXT"
                , "salesAnalysis4":"SAMPLE_TEXT"
                , "salesAnalysis5":"SAMPLE_TEXT"
                , "salesAnalysis6":"SAMPLE_TEXT"
                , "memo1":"SAMPLE_TEXT"
                , "memo2":"SAMPLE_TEXT"
                , "memo3":"SAMPLE_TEXT"
                , "memo4":"SAMPLE_TEXT"
                , "memo5":"SAMPLE_TEXT"
                , "memo6":"SAMPLE_TEXT"
                , "stockAnalysis01":"SAMPLE_TEXT"
                , "stockAnalysis02":"SAMPLE_TEXT"
                , "stockAnalysis03":"SAMPLE_TEXT"
                , "stockAnalysis04":"SAMPLE_TEXT"
                , "stockAnalysis05":"SAMPLE_TEXT"
                , "stockAnalysis06":"SAMPLE_TEXT"
                , "stockAnalysis07":"SAMPLE_TEXT"
                , "stockAnalysis08":"SAMPLE_TEXT"
                , "stockAnalysis09":"SAMPLE_TEXT"
                , "stockAnalysis10":"SAMPLE_TEXT"
                , "deliveryCode":"SAMPLE_TEXT"
                , "transactionCode":"SAMPLE_TEXT"
                , "code":"SAMPLE_TEXT"
                , "salesOrderStatusCode":"SAMPLE_TEXT"
                , "despatchStatusID":"SAMPLE_TEXT"
                , "division":"SAMPLE_TEXT"
                , "lineNumber":"SAMPLE_TEXT"
                , "despatchStatusCode":"SAMPLE_TEXT"
                , "quantityOrdered":null
                , "quantityOutstanding":null
                , "quantityDespatched":null
                , "despatchDate":"2020-01-01T00:00:00.000Z"
                , "custRequiredDate":"2020-01-01T00:00:00.000Z"
                , "unitPrice":null
                , "unitPriceinBase":null
                , "lineDiscountPercent":null
                , "marginPercent":null
                , "lineTotal":null
                , "lineTotalinBase":null
                , "taxCode":"SAMPLE_TEXT"
                , "nominalCode":"SAMPLE_TEXT"
                , "onHold":null
                , "rCode":"SAMPLE_TEXT"
                , "standardMargin":null
                , "deliveryAddress":"SAMPLE_TEXT"
                , "deliveryAddressDescription":"SAMPLE_TEXT"
                , "deliveryCountryCode":"SAMPLE_TEXT"
                , "salesOrderStatus":"SAMPLE_TEXT"
                }""")).asJson
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_salesOrder_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created salesOrder")
                .get("${new_salesOrder_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created salesOrder")
            .delete("${new_salesOrder_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) during (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
